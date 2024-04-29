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

  private presetProperties = {
    '#sdk_type': 'javascript',
    '#sdk_version_name': version,
  } as const;

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

    Logger.info('<call initSDK>', this.config, this.settings);
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
    this.taskQueue.enqueue(() => ({
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
    }));
    Logger.info('<call track>', {
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
    });
  }
  enableUpload(): void {
    if (this.config.manualEnableUpload) this.report();
    Logger.info('<call enableUpload>');
  }

  private createTask(event_name: string, event_type: string, properties: Record<string, any>) {
    this.taskQueue.enqueue(() => ({
      ...this.settings,
      '#event_name': event_name,
      '#event_type': event_type,
      '#event_time': new Date().getTime(),
      properties,
    }));
  }
  /* user */
  userSet<K extends string>(properties: Record<PublicKey<K>, string | boolean | number>): void {
    this.createTask('#user_set', 'user', properties);
    Logger.info('<call userSet>', properties);
  }
  userSetOnce<K extends string>(properties: Record<PublicKey<K>, string | boolean | number>): void {
    this.createTask('#user_set_once', 'user', properties);
    Logger.info('<call userSetOnce>', properties);
  }
  userAdd<K extends string>(properties: Record<PublicKey<K>, number>): void {
    this.createTask('#user_add', 'user', properties);
    Logger.info('<call userAdd>', properties);
  }
  userUnset(properties: string[]): void {
    this.createTask('#user_unset', 'user', properties);
    Logger.info('<call userUnset>', properties);
  }
  userDelete(): void {
    this.createTask('#user_delete', 'user', {});
    Logger.info('<call userDelete>');
  }
  userAppend<K extends string>(properties: Record<PublicKey<K>, any[]>): void {
    this.createTask('#user_append', 'user', properties);
    Logger.info('<call userAppend>', properties);
  }
  userUniqAppend<K extends string>(properties: Record<PublicKey<K>, any[]>): void {
    this.createTask('#user_uniq_append', 'user', properties);
    Logger.info('<call userUniqAppend>', properties);
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
    Logger.info('<call getDataTowerId>', callback);
  }
  setAccountId(id: string): void {
    this.settings['#acid'] = id;
    Logger.info('<call setAccountId>', id);
  }
  setFirebaseAppInstanceId(id: string): void {
    this.createTask('#user_set', 'user', { '#latest_firebase_iid': id });
    Logger.info('<call setFirebaseAppInstanceId>', id);
  }
  setAppsFlyerId(id: string): void {
    this.createTask('#user_set', 'user', { '#latest_appsflyer_id': id });
    Logger.info('<call setAppsFlyerId>', id);
  }
  setKochavaId(id: string): void {
    this.createTask('#user_set', 'user', { '#latest_kochava_id': id });
    Logger.info('<call setKochavaId>', id);
  }
  setAdjustId(id: string): void {
    this.createTask('#user_set', 'user', { '#latest_adjust_id': id });
    Logger.info('<call setAdjustId>', id);
  }

  /* properties */
  setStaticCommonProperties<K extends string>(properties: Record<PublicKey<K>, string | boolean | number>): void {
    this.staticProperties = { ...this.staticProperties, ...properties };
    Logger.info('<call setStaticCommonProperties>', properties);
  }
  clearStaticCommonProperties(): void {
    this.staticProperties = {};
    Logger.info('<call clearStaticCommonProperties>');
  }
  setCommonProperties(callback: () => Record<string, string | boolean | number>): void {
    this.dynamicProperties = callback;
    Logger.info('<call setCommonProperties>', callback);
  }
  clearCommonProperties(): void {
    this.dynamicProperties = null;
    Logger.info('<call clearCommonProperties>');
  }

  // TODO: implement the following methods
  trackTimerStart(eventName: string): void {
    Logger.info('<call trackTimerStart>', eventName);
    throw new Error('Method not implemented.');
  }
  trackTimerPause(eventName: string): void {
    Logger.info('<call trackTimerPause>', eventName);
    throw new Error('Method not implemented.');
  }
  trackTimerResume(eventName: string): void {
    Logger.info('<call trackTimerResume>', eventName);
    throw new Error('Method not implemented.');
  }
  trackTimerEnd<K extends string>(eventName: string, properties: Properties<K>): void {
    Logger.info('<call trackTimerEnd>', eventName, properties);
    throw new Error('Method not implemented.');
  }
  reportLoadBegin<K extends string>(opts: BaseReportOptions<K>): void {
    Logger.info('<call reportLoadBegin>', opts);
    throw new Error('Method not implemented.');
  }
  reportLoadEnd<K extends string>(
    opts: BaseReportOptions<K> & { duration: number; result: boolean; errorCode: number; errorMessage: string },
  ): void {
    Logger.info('<call reportLoadEnd>', opts);
    throw new Error('Method not implemented.');
  }
  reportToShow<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions): void {
    Logger.info('<call reportToShow>', opts);
    throw new Error('Method not implemented.');
  }
  reportShow<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions): void {
    Logger.info('<call reportShow>', opts);
    throw new Error('Method not implemented.');
  }
  reportShowFailed<K extends string>(
    opts: BaseReportOptions<K> & CommonReportOptions & { errorCode: number; errorMessage: string },
  ): void {
    Logger.info('<call reportShowFailed>', opts);
    throw new Error('Method not implemented.');
  }
  reportClose<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions): void {
    Logger.info('<call reportClose>', opts);
    throw new Error('Method not implemented.');
  }
  reportClick<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions): void {
    Logger.info('<call reportClick>', opts);
    throw new Error('Method not implemented.');
  }
  reportRewarded<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions): void {
    Logger.info('<call reportRewarded>', opts);
    throw new Error('Method not implemented.');
  }
  reportConversionByClick<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions): void {
    Logger.info('<call reportConversionByClick>', opts);
    throw new Error('Method not implemented.');
  }
  reportConversionByLeftApp<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions): void {
    Logger.info('<call reportConversionByLeftApp>', opts);
    throw new Error('Method not implemented.');
  }
  reportConversionByRewarded<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions): void {
    Logger.info('<call reportConversionByRewarded>', opts);
    throw new Error('Method not implemented.');
  }
  reportPaid<K extends string>(opts: BaseReportPaidOptions<K> & { country: string }): void;
  reportPaid<K extends string>(opts: BaseReportPaidOptions<K> & { currency: string; entrance: string }): void;
  reportPaid<K extends string>(
    opts: BaseReportPaidOptions<K> & { country: string } & { currency: string; entrance: string },
  ): void {
    Logger.info('<call reportPaid>', opts);
    throw new Error('Method not implemented.');
  }
  reportLeftApp<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions): void {
    Logger.info('<call reportLeftApp>', opts);
    throw new Error('Method not implemented.');
  }
  reportPurchaseSuccess<K extends string>(opts: ReportSuccessOptions<K> & { order: string }): void {
    Logger.info('<call reportPurchaseSuccess>', opts);
    throw new Error('Method not implemented.');
  }
  reportSubscribeSuccess<K extends string>(
    opts: ReportSuccessOptions<K> & { originalOrderId: string; orderId: string },
  ): void {
    Logger.info('<call reportSubscribeSuccess>', opts);
    throw new Error('Method not implemented.');
  }
}
