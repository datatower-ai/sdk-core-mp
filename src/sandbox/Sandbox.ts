import parseUrl from '@/node_modules/parse-url';
import { version } from '@/package.json';
import type { DataTower } from '@/src/StaticDataTower';
import { DEFAULT_CONFIG } from '@/src/constant';
import type { Config, PublicKey } from '@/src/type';
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

  private staticProperties: Record<string, any> = {};

  private dynamicProperties: null | (() => Record<string, string | boolean | number>) = null;

  private get presetProperties() {
    const { height, width, os, platform, viewport, title } = this.shim.getSystemInfo();
    const referrer = this.shim.getReferrer();
    return {
      '#sdk_type': 'javascript',
      '#sdk_version_name': version,

      '#screen_height': height,
      '#screen_width': width,
      '#timezone_offset': 0 - new Date().getTimezoneOffset() / 60,
      '#is_first_day': Number(this.settings['#dt_id'].split('-')[0]) + 24 * 60 * 60 * 1000 <= new Date().getTime(),
      '#title': title,
      '#url': this.shim.getUrl(),
      '#viewport_height': viewport.height,
      '#viewport_width': viewport.width,
      '#platform': platform.name,
      '#platform_version': platform.version,
      '#os': os.name,
      '#os_version': os.version,

      '#latest_referrer': referrer,
      '#latest_referrer_host': parseUrl(referrer).resource,
    } as const;
  }

  /**
   * @param shim - 平台适配器，用于获取系统信息、存储、网络请求等，抹平不同平台的差异
   */
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
    Logger.debug('<initSDK>', this.config, this.settings, this.presetProperties);
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
  }

  private async initializeNewUser() {
    const dt_id = this.generateDataTowerId();
    const { language } = this.shim.getSystemInfo();
    this.userSetOnce({
      '#first_visit_time': new Date().getTime(),
      '#first_referrer': this.shim.getReferrer(),
      '#first_browser_language': language.toLowerCase(),
    });
    await this.shim.setStorage('#dt_id', dt_id);
  }

  track(eventName: string, properties: Record<string, string | boolean | number>): void {
    Logger.debug('<track>', eventName, properties);
    this.createTask(eventName, 'track', {
      ...properties,
      ...this.staticProperties,
      ...this.dynamicProperties?.(),
      ...this.presetProperties,
    });
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
  userAppend<K extends string>(properties: Record<PublicKey<K>, (string | boolean | number)[]>): void {
    Logger.debug('<userAppend>', properties);
    this.createTask('#user_append', 'user', properties);
  }
  userUniqAppend<K extends string>(properties: Record<PublicKey<K>, (string | boolean | number)[]>): void {
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
}
