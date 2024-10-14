import { Logger } from '@/Logger';
import { MultipleInstanceManager } from '@/MultipleInstanceManager';
import { StaticDataTower, type DataTower } from '@/StaticDataTower';
import { TaskQueue } from '@/TaskQueue';
import { DEFAULT_CONFIG } from '@/constant';
import type { ArrayProperties, Config, Properties } from '@/type';
import { encodeBase64, md5, parseUrl, stringifyUrl, throttle } from '@/utils';
import { version } from '~/package.json';
import type { Shim } from './shim/type';

/**
 * Sandbox
 * includes platform: mini program/mini gram/quick app/quick game/web
 */
export class Sandbox implements DataTower {
  private config: Required<Config> = DEFAULT_CONFIG;
  private readonly taskQueue: TaskQueue<Record<string, any>, true> = new TaskQueue();

  private settings = {
    '#acid': '',
    '#app_id': '',
    '#dt_id': '',
  };

  private staticCommonProperties: Record<string, any> = {};

  private dynamicCommonProperties: null | (() => Properties) = null;

  private get presetProperties() {
    const { height, width, os, platform, viewport, title } = this.shim.systemInfo;
    const referrer = this.shim.referrer;
    return <const>{
      '#sdk_type': 'javascript',
      '#sdk_version_name': version,

      '#screen_height': height,
      '#screen_width': width,
      // '#timezone_offset': 0 - new Date().getTimezoneOffset() / 60,
      // '#is_first_day': Number(this.settings['#dt_id'].split('-')[0]) + 24 * 60 * 60 * 1000 >= new Date().getTime(),
      '#title': title,
      '#url': this.shim.href,
      '#viewport_height': viewport.height,
      '#viewport_width': viewport.width,
      '#platform': platform.name,
      '#platform_version': platform.version,
      '#os': os.name,
      '#os_version': os.version,

      '#latest_referrer': referrer,
      '#latest_referrer_host': referrer && stringifyUrl(parseUrl(referrer), 'host'),
    };
  }

  /**
   * @param shim - 平台适配器，用于获取系统信息、存储、网络请求等，抹平不同平台的差异
   */
  constructor(protected readonly shim: Shim) {}

  private get url() {
    const { token, app_id, server_url } = this.config;
    const urlOpts = parseUrl(server_url);
    const { query } = urlOpts;
    urlOpts.query = { ...query, token, app_id };
    return stringifyUrl(urlOpts);
  }

  private async report() {
    const tasks = this.taskQueue.flush();
    if (!tasks.length) return;
    const dataStr = JSON.stringify(tasks);
    const base64 = encodeBase64(dataStr);
    const check = md5(base64 + '@datatower');
    const params = <const>`data=${base64}&check=${check}`;
    if (this.config.isDebug) return Logger.debug('<request>', params);
    try {
      return this.shim.request({ url: this.url, params });
    } catch (e) {
      // 请求出错时，缓存数据
      this.cacheTaskQueue(tasks);
      throw e;
    }
  }
  private async cacheTaskQueue(list: Record<string, any>[]) {
    const cache = (await this.shim.getStorage<Record<string, any>[]>(`task_queue@${this.config.app_id}`)) ?? [];
    this.shim.setStorage(`task_queue@${this.config.app_id}`, [...cache, ...list]);
  }
  private async recoverTaskQueue() {
    const cache = (await this.shim.getStorage<Record<string, any>[]>(`task_queue@${this.config.app_id}`)) ?? [];
    cache.forEach((c) => this.taskQueue.enqueue(() => c));
    await this.shim.setStorage(`task_queue@${this.config.app_id}`, []);
  }

  async initSDK(config: Config) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    // 设置日志等级
    Logger.level = this.config.logLevel;
    // 非手动启动上报时，监听任务队列事件
    if (!this.config.manualEnableUpload) {
      this.taskQueue.onMaxSize(() => this.report());
      this.taskQueue.onEnqueue(throttle(() => this.report(), this.config.throttleWait));
      this.config.maxQueueSize && this.taskQueue.setMaxSize(this.config.maxQueueSize);
    }
    // 监听页面卸载事件，缓存未上报的数据
    this.shim.onUnload(() => this.cacheTaskQueue(this.taskQueue.flush()));
    // 恢复数据
    this.recoverTaskQueue();

    this.settings['#app_id'] = this.config.app_id;
    this.settings['#acid'] = (await this.shim.getStorage<string>(`#acid@${this.config.app_id}`)) ?? '';
    this.staticCommonProperties = (await this.shim.getStorage(`static_common_properties@${this.config.app_id}`)) ?? {};
    // 通过 #dt_id 判断是否为新用户，如果是新用户则初始化
    if (!(await this.shim.getStorage('#dt_id'))) {
      const dt_id = this.generateDataTowerId();
      this.settings['#dt_id'] = dt_id;
      await this.shim.setStorage('#dt_id', dt_id);
    } else this.settings['#dt_id'] = (await this.shim.getStorage<string>('#dt_id'))!;
  }

  private validatePropertiesKey(properties: Record<string, any>) {
    const errors: string[] = [];
    for (const key in properties) {
      for (const k of ['#', '$']) {
        if (!key.startsWith(k)) continue;
        errors.push(`The key "${key}" is invalid, it can't start with "${k}"`);
      }
    }
    if (this.config.isDebug) errors.forEach((e) => Logger.error(e));
    return !errors.length;
  }

  track(eventName: string, properties: Properties): void {
    if (!this.validatePropertiesKey(properties)) return;
    this.createTask(eventName, 'track', {
      ...properties,
      ...this.staticCommonProperties,
      ...this.dynamicCommonProperties?.(),
      ...this.presetProperties,
    });
  }
  enableUpload(): void {
    if (!this.config.manualEnableUpload) {
      if (this.config.isDebug) Logger.warn('manualEnableUpload is false');
    } else {
      if (this.config.isDebug) Logger.debug('<enableUpload>');
      this.report();
    }
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
    if (this.config.isDebug) Logger.debug(data);
  }
  /* user */
  userSet(properties: Properties): void {
    if (!this.validatePropertiesKey(properties)) return;
    this.createTask('#user_set', 'user', properties);
  }
  userSetOnce(properties: Properties): void {
    if (!this.validatePropertiesKey(properties)) return;
    this.createTask('#user_set_once', 'user', properties);
  }
  userAdd(properties: Record<string, number>): void {
    if (!this.validatePropertiesKey(properties)) return;
    this.createTask('#user_add', 'user', properties);
  }
  userUnset(properties: string[]): void {
    this.createTask('#user_unset', 'user', properties);
  }
  userDelete(): void {
    this.createTask('#user_delete', 'user', {});
  }
  userAppend(properties: ArrayProperties): void {
    if (!this.validatePropertiesKey(properties)) return;
    this.createTask('#user_append', 'user', properties);
  }
  userUniqAppend(properties: ArrayProperties): void {
    if (!this.validatePropertiesKey(properties)) return;
    this.createTask('#user_uniq_append', 'user', properties);
  }

  /* id */
  private generateDataTowerId() {
    const sys = this.shim.systemInfo;
    function getRandom() {
      // @ts-ignore
      const cryptoObj = window.crypto || window.msCrypto;
      const array = new Uint32Array(1);
      const integerLimit = Math.pow(2, 32);
      const random = cryptoObj.getRandomValues(array)[0];
      return random / integerLimit;
    }
    const getTime = () => {
      const d = new Date().getTime();
      let i = 0;
      while (d == new Date().getTime()) {
        i++;
      }
      return d.toString(16) + i.toString(16);
    };
    const getUAInfo = () => {
      var ua = this.shim.userAgent,
        i,
        ch,
        buffer: number[] = [],
        ret = 0;

      function xor(result: number, byte_array: number[]) {
        var j,
          tmp = 0;
        for (j = 0; j < byte_array.length; j++) {
          tmp |= buffer[j] << (j * 8);
        }
        return result ^ tmp;
      }

      for (i = 0; i < ua.length; i++) {
        ch = ua.charCodeAt(i);
        buffer.unshift(ch & 0xff);
        if (buffer.length >= 4) {
          ret = xor(ret, buffer);
          buffer = [];
        }
      }

      if (buffer.length > 0) {
        ret = xor(ret, buffer);
      }

      return ret.toString(16);
    };
    const getScreenInfo = () => {
      let se = String(screen.height * screen.width);
      if (se && /\d{5,}/.test(se)) {
        se = se.toString();
      } else {
        se = String(getRandom() * 31242)
          .replace('.', '')
          .slice(0, 8);
      }

      return se;
    };
    const fingerprint = [getTime(), getRandom().toString(16).replace('.', ''), getUAInfo(), getScreenInfo(), getTime()];
    return fingerprint.join('-');
  }
  getDataTowerId(callback: (id: string) => void): void;
  getDataTowerId(): Promise<string>;
  getDataTowerId(callback?: (id: string) => void): void | Promise<string> {
    if (!callback) return new Promise((resolve) => this.getDataTowerId(resolve));
    callback(this.settings['#dt_id']);
    if (this.config.isDebug) Logger.debug('#dt_id:', this.settings['#dt_id']);
  }
  setAccountId(id: string): void {
    this.settings['#acid'] = id;
    this.shim.setStorage(`#acid@${this.config.app_id}`, id);
    if (this.config.isDebug) Logger.debug('#acid:', id);
  }

  /* properties */
  setStaticCommonProperties(properties: Properties): void {
    if (!this.validatePropertiesKey(properties)) return;
    this.staticCommonProperties = { ...this.staticCommonProperties, ...properties };
    this.shim.setStorage(`static_common_properties@${this.config.app_id}`, this.staticCommonProperties);
    if (this.config.isDebug) Logger.debug('<staticCommonProperties>', this.staticCommonProperties);
  }
  clearStaticCommonProperties(): void {
    this.staticCommonProperties = {};
    this.shim.setStorage(`static_common_properties@${this.config.app_id}`, {});
    if (this.config.isDebug) Logger.debug('<clearStaticCommonProperties>');
  }
  setDynamicCommonProperties(callback: () => Properties): void {
    this.dynamicCommonProperties = () => {
      const properties = callback();
      if (!this.validatePropertiesKey(properties)) return {};
      return properties;
    };
    if (this.config.isDebug) Logger.debug('<setDynamicCommonProperties>');
  }
  clearDynamicCommonProperties(): void {
    this.dynamicCommonProperties = null;
    if (this.config.isDebug) Logger.debug('<clearDynamicCommonProperties>');
  }
}

/** structure static Sandbox DataTower class with shim */
export function structure(shim: Shim): DataTower {
  return class extends StaticDataTower {
    protected static readonly instances = new MultipleInstanceManager<DataTower>(() => new Sandbox(shim));
  };
}
