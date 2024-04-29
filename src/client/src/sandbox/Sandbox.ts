import { version } from '@/package.json';
import type { DataTower } from '@/src/StaticDataTower';
import { DEFAULT_CONFIG } from '@/src/constant';
import type {
  BaseReportOptions,
  BaseReportPaidOptions,
  CommonReportOptions,
  Config,
  Properties,
  PublicKey,
  ReportSuccessOptions,
} from '@/src/type';
import { debounce, md5, sha256 } from '@/src/utils';
import { Logger } from './Logger';
import { TaskQueue } from './TaskQueue';
import type { Shim } from './shim/type';

/**
 * Sandbox
 * includes platform: mini program/mini gram/quick app/quick game/web
 */
export class Sandbox implements DataTower {
  private config: Required<Config> = DEFAULT_CONFIG;
  private taskQueue: TaskQueue<Record<string, any>, true> = new TaskQueue();

  private settings = {
    '#acid': '',
    '#app_id': '',
    '#dt_id': '',
  };

  private presetProperties = { '#sdk_type': 'javascript', '#sdk_version_name': version } as const;

  private staticProperties: Record<string, any> = {};

  private dynamicProperties: null | (() => Record<string, string | boolean | number>) = null;

  constructor(protected shim: Shim) {}

  private report() {
    const tasks = this.taskQueue.flush();
    if (!tasks.length) return;
    const data = JSON.stringify(tasks);
    const base64 = btoa(data);
    const check = md5(base64 + '@datatower').toString();
    const params = new URLSearchParams({ data, check }).toString();
    return this.shim.request({ url: this.config.serverUrl, data: params });
  }

  async initSDK(config: Config) {
    this.shim.getSystemInfo();
    this.config = { ...DEFAULT_CONFIG, ...config };
    // 设置日志等级
    Logger.level = this.config.logLevel;
    // 非手动启动上报时，监听任务队列事件
    if (!this.config.manualEnableUpload) {
      this.taskQueue.onMaxSize(() => this.report());
      this.taskQueue.onEnqueue(debounce(() => this.report(), this.config.debounceWait));
      this.config.maxQueueSize && this.taskQueue.setMaxSize(this.config.maxQueueSize);
    }
    // 通过 #dt_id 判断是否为新用户，如果是新用户则初始化
    if (!(await this.shim.getStorage('#dt_id'))) await this.initializeNewUser();
    this.settings['#dt_id'] = (await this.shim.getStorage<string>('#dt_id'))!;

    this.settings['#app_id'] = this.config.appId ?? this.shim.getSystemInfo().appId;

    Logger.debug('<initSDK>', this.config, this.settings);
  }

  private async initializeNewUser() {
    const dt_id = this.generateDataTowerId();
    this.userSetOnce({
      '#first_visit_time': new Date().getTime(),
      '#first_referrer': this.shim.getReferrer(),
      '#first_browser_language': navigator.language.toLowerCase(),
    });
    await this.shim.setStorage('#dt_id', dt_id);
  }

  track(eventName: string, properties: Record<string, string | boolean | number>): void {
    const data = {
      ...this.settings,
      '#event_time': new Date().getTime(),
      '#event_name': eventName,
      '#event_type': 'track',
      properties: {
        ...properties,
        ...this.staticProperties,
        ...this.dynamicProperties?.(),
        ...this.presetProperties,
      },
    };
    this.taskQueue.enqueue(() => data);
    Logger.debug('<track>', data);
  }
  enableUpload(): void {
    if (this.config.manualEnableUpload) this.report();
    Logger.debug('<enableUpload>');
  }

  private createTask(event_name: string, event_type: string, properties: Record<string, any>) {
    const data = {
      ...this.settings,
      '#event_name': event_name,
      '#event_type': event_type,
      '#event_time': new Date().getTime(),
      properties,
    };
    this.taskQueue.enqueue(() => data);
    Logger.debug('<createTask>', data);
  }
  /* user */
  userSet<K extends string>(properties: Record<PublicKey<K>, string | boolean | number>): void {
    Logger.debug('<userSet>', properties);
    this.createTask('#user_set', 'user', properties);
  }
  userSetOnce<K extends string>(properties: Record<PublicKey<K>, string | boolean | number>): void {
    Logger.debug('<userSetOnce>', properties);
    this.createTask('#user_set_once', 'user', properties);
  }
  userAdd<K extends string>(properties: Record<PublicKey<K>, number>): void {
    Logger.debug('<userAdd>', properties);
    this.createTask('#user_add', 'user', properties);
  }
  userUnset(properties: string[]): void {
    Logger.debug('<userUnset>', properties);
    this.createTask('#user_unset', 'user', properties);
  }
  userDelete(): void {
    Logger.debug('<userDelete>');
    this.createTask('#user_delete', 'user', {});
  }
  userAppend<K extends string>(properties: Record<PublicKey<K>, any[]>): void {
    Logger.debug('<userAppend>', properties);
    this.createTask('#user_append', 'user', properties);
  }
  userUniqAppend<K extends string>(properties: Record<PublicKey<K>, any[]>): void {
    Logger.debug('<userUniqAppend>', properties);
    this.createTask('#user_uniq_append', 'user', properties);
  }

  /* id */
  private generateDataTowerId() {
    const sys = this.shim.getSystemInfo();
    const fingerprint = [
      new Date().getTime(),
      Math.random().toString(16).replace('.', ''),
      sha256(this.shim.getUserAgent()),
      sha256(`${sys.width} ${sys.height} ${sys.language}`),
      new Date().getTime(),
    ];
    return fingerprint.join('-');
  }
  getDataTowerId(callback: (id: string) => void): void;
  getDataTowerId(): Promise<string>;
  getDataTowerId(callback?: (id: string) => void): void | Promise<string> {
    if (!callback) return new Promise((resolve) => this.getDataTowerId(resolve));
    callback(this.settings['#dt_id']);
    Logger.debug('<getDataTowerId>', callback);
  }
  setAccountId(id: string): void {
    this.settings['#acid'] = id;
    Logger.debug('<setAccountId>', id);
  }
  setFirebaseAppInstanceId(id: string): void {
    Logger.debug('<setFirebaseAppInstanceId>', id);
    this.createTask('#user_set', 'user', { '#latest_firebase_iid': id });
  }
  setAppsFlyerId(id: string): void {
    Logger.debug('<setAppsFlyerId>', id);
    this.createTask('#user_set', 'user', { '#latest_appsflyer_id': id });
  }
  setKochavaId(id: string): void {
    Logger.debug('<setKochavaId>', id);
    this.createTask('#user_set', 'user', { '#latest_kochava_id': id });
  }
  setAdjustId(id: string): void {
    Logger.debug('<setAdjustId>', id);
    this.createTask('#user_set', 'user', { '#latest_adjust_id': id });
  }

  /* properties */
  setStaticCommonProperties<K extends string>(properties: Record<PublicKey<K>, string | boolean | number>): void {
    this.staticProperties = { ...this.staticProperties, ...properties };
    Logger.debug('<setStaticCommonProperties>', properties);
  }
  clearStaticCommonProperties(): void {
    this.staticProperties = {};
    Logger.debug('<clearStaticCommonProperties>');
  }
  setCommonProperties(callback: () => Record<string, string | boolean | number>): void {
    this.dynamicProperties = callback;
    Logger.debug('<setCommonProperties>', callback);
  }
  clearCommonProperties(): void {
    this.dynamicProperties = null;
    Logger.debug('<clearCommonProperties>');
  }

  // TODO: implement the following methods
  trackTimerStart(eventName: string): void {
    Logger.debug('<trackTimerStart>', eventName);
    throw new Error('Method not implemented.');
  }
  trackTimerPause(eventName: string): void {
    Logger.debug('<trackTimerPause>', eventName);
    throw new Error('Method not implemented.');
  }
  trackTimerResume(eventName: string): void {
    Logger.debug('<trackTimerResume>', eventName);
    throw new Error('Method not implemented.');
  }
  trackTimerEnd<K extends string>(eventName: string, properties: Properties<K>): void {
    Logger.debug('<trackTimerEnd>', eventName, properties);
    throw new Error('Method not implemented.');
  }
  reportLoadBegin<K extends string>(opts: BaseReportOptions<K>): void {
    Logger.debug('<reportLoadBegin>', opts);
    throw new Error('Method not implemented.');
  }
  reportLoadEnd<K extends string>(
    opts: BaseReportOptions<K> & { duration: number; result: boolean; errorCode: number; errorMessage: string },
  ): void {
    Logger.debug('<reportLoadEnd>', opts);
    throw new Error('Method not implemented.');
  }
  reportToShow<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions): void {
    Logger.debug('<reportToShow>', opts);
    throw new Error('Method not implemented.');
  }
  reportShow<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions): void {
    Logger.debug('<reportShow>', opts);
    throw new Error('Method not implemented.');
  }
  reportShowFailed<K extends string>(
    opts: BaseReportOptions<K> & CommonReportOptions & { errorCode: number; errorMessage: string },
  ): void {
    Logger.debug('<reportShowFailed>', opts);
    throw new Error('Method not implemented.');
  }
  reportClose<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions): void {
    Logger.debug('<reportClose>', opts);
    throw new Error('Method not implemented.');
  }
  reportClick<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions): void {
    Logger.debug('<reportClick>', opts);
    throw new Error('Method not implemented.');
  }
  reportRewarded<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions): void {
    Logger.debug('<reportRewarded>', opts);
    throw new Error('Method not implemented.');
  }
  reportConversionByClick<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions): void {
    Logger.debug('<reportConversionByClick>', opts);
    throw new Error('Method not implemented.');
  }
  reportConversionByLeftApp<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions): void {
    Logger.debug('<reportConversionByLeftApp>', opts);
    throw new Error('Method not implemented.');
  }
  reportConversionByRewarded<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions): void {
    Logger.debug('<reportConversionByRewarded>', opts);
    throw new Error('Method not implemented.');
  }
  reportPaid<K extends string>(opts: BaseReportPaidOptions<K> & { country: string }): void;
  reportPaid<K extends string>(opts: BaseReportPaidOptions<K> & { currency: string; entrance: string }): void;
  reportPaid<K extends string>(
    opts: BaseReportPaidOptions<K> & ({ country: string } | { currency: string; entrance: string }),
  ): void {
    Logger.debug('<reportPaid>', opts);
    throw new Error('Method not implemented.');
  }
  reportLeftApp<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions): void {
    Logger.debug('<reportLeftApp>', opts);
    throw new Error('Method not implemented.');
  }
  reportPurchaseSuccess<K extends string>(opts: ReportSuccessOptions<K> & { order: string }): void {
    Logger.debug('<reportPurchaseSuccess>', opts);
    throw new Error('Method not implemented.');
  }
  reportSubscribeSuccess<K extends string>(
    opts: ReportSuccessOptions<K> & { originalOrderId: string; orderId: string },
  ): void {
    Logger.debug('<reportSubscribeSuccess>', opts);
    throw new Error('Method not implemented.');
  }
}
