import { version } from '@/package.json';
import type { DataTower } from '@/src/StaticDataTower';
import { DEFAULT_CONFIG } from '@/src/constant';
import type { Config, PublicKey } from '@/src/type';
import { debounce, md5, sha256 } from '@/src/utils';
import { Logger } from './Logger';
import { TaskQueue } from './TaskQueue';
import type { Shim } from './shim/type';

/**
 * TODO: Sandbox
 * includes platform: mini program/mini gram/quick app/quick game/web
 */
export class Sandbox implements DataTower {
  private config: Required<Config> = DEFAULT_CONFIG;
  private taskQueue: TaskQueue<Record<string, any>, true> = new TaskQueue();

  private settings = {
    '#acid': '',
    '#disctId': '',
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
    const params = new URLSearchParams({ data: encodeURIComponent(data), check }).toString();
    return this.shim.request({ url: this.config.serverUrl, data: params });
  }

  async init(config: Config) {
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
    if (!this.shim.getStorage('#dt_id')) await this.initializeNewUser();
    this.settings['#dt_id'] = (await this.shim.getStorage<string>('#dt_id'))!;

    // web平台无 #app_id
    this.settings['#app_id'] = this.config.appId ?? this.shim.getSystemInfo().appId;

    Logger.info('<call init>', config);
  }

  private async initializeNewUser() {
    const dt_id = this.generateDataTowerId();
    this.userSetOnce({
      '#first_visit_time': new Date().getTime(),
      // '#first_referrer': getReferrer(false),
      '#first_browser_language': navigator.language.toLowerCase(),
    });
    await this.shim.setStorage('#dt_id', dt_id);
  }

  track(eventName: string, properties: Record<string, string | boolean | number>): void {
    Logger.info('<call track>', eventName, properties);
    this.taskQueue.enqueue(() => ({
      ...this.settings,
      properties: {
        ...properties,
        ...this.staticProperties,
        ...this.dynamicProperties?.(),
        ...this.presetProperties,
      },
    }));
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
  getDistinctId(callback: (id: string) => void): void;
  getDistinctId(): Promise<string>;
  getDistinctId(callback?: (id: string) => void): void | Promise<string> {
    if (!callback) return new Promise((resolve) => this.getDistinctId(resolve));
    callback(this.settings['#disctId']);
    Logger.info('<call getDistinctId>');
  }
  setAccountId(id: string): void {
    this.settings['#acid'] = id;
    Logger.info('<call setAccountId>', id);
  }
  setDistinctId(id: string): void {
    this.settings['#disctId'] = id;
    Logger.info('<call setDistinctId>', id);
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
}
