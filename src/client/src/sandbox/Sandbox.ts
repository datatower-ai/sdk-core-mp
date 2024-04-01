import { version } from '$/package.json';
import type { DataTower } from '@/StaticDataTower';
import { DEFAULT_CONFIG } from '@/constant';
import type { Config } from '@/type';
import { debounce } from '@/utils';
import { MD5 } from 'crypto-js';
import { Logger } from './Logger';
import { TaskQueue } from './TaskQueue';
import type { MiniShim } from './shim/MiniShim';
import type { QuickAppShim } from './shim/QuickAppShim';
import type { QuickGameShim } from './shim/QuickGameShim';
import type { WebShim } from './shim/WebShim';

/**
 * TODO: Sandbox
 * includes platform: mini program/mini gram/quick app/quick game/web
 */
export class Sandbox implements DataTower {
  private config: Required<Config> = DEFAULT_CONFIG;
  private properties: Record<string, string | boolean | number> = { '#sdk_type': 'js', '#sdk_version_name': version };
  private dynamicPropertiesCallback: null | (() => Record<string, string | boolean | number>) = null;
  private taskQueue: TaskQueue<Record<string, any>, true> = new TaskQueue();

  constructor(private shim: MiniShim | QuickAppShim | QuickGameShim | WebShim) {}

  private report() {
    const tasks = this.taskQueue.flush();
    if (!tasks.length) return;
    const data = JSON.stringify(tasks);
    const base64 = btoa(data);
    const check = MD5(base64 + '@datatower').toString();
    const params = new URLSearchParams({ data: encodeURIComponent(data), check }).toString();
    return this.shim.request({ url: this.config.serverUrl, data: params });
  }

  init(config: Config) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    Logger.level = this.config.logLevel;

    if (!this.config.manualEnableUpload) {
      this.taskQueue.onMaxSize(() => this.report());
      this.taskQueue.onEnqueue(debounce(() => this.report(), this.config.debounceWait));
      this.config.maxQueueSize && this.taskQueue.setMaxSize(this.config.maxQueueSize);
    }

    Logger.info('<call init>', config);
  }
  track(eventName: string, properties: Record<string, string | boolean | number>): void {
    Logger.info('<call track>', eventName, properties);
    this.taskQueue.enqueue(() => ({ ...properties, ...this.properties, ...this.dynamicPropertiesCallback?.() }));
  }
  enableUpload(): void {
    if (this.config.manualEnableUpload) this.report();
    Logger.info('<call enableUpload>');
  }
  userSet(properties: Record<string, string | boolean | number>): void {
    Logger.info('<call userSet>', properties);
  }
  userSetOnce(properties: Record<string, string | boolean | number>): void {
    Logger.info('<call userSetOnce>', properties);
  }
  userAdd(properties: Record<string, number>): void {
    Logger.info('<call userAdd>', properties);
  }
  userUnset(properties: string[]): void {
    Logger.info('<call userUnset>', properties);
  }
  userDelete(): void {
    Logger.info('<call userDelete>');
  }
  userAppend(properties: Record<string, string | boolean | number>): void {
    Logger.info('<call userAppend>', properties);
  }
  userUniqAppend(properties: Record<string, any[]>): void {
    Logger.info('<call userUniqAppend>', properties);
  }
  getDataTowerId(callback: (id: string) => void): void;
  getDataTowerId(): Promise<string>;
  getDataTowerId(callback?: (id: string) => void): void | Promise<string> {
    if (!callback) return new Promise((resolve) => this.getDataTowerId(resolve));
    Logger.info('<call getDataTowerId>', callback);
  }
  getDistinctId(callback: (id: string) => void): void;
  getDistinctId(): Promise<string>;
  getDistinctId(callback?: (id: string) => void): void | Promise<string> {
    if (!callback) return new Promise((resolve) => this.getDistinctId(resolve));
    Logger.info('<call getDistinctId>');
  }
  setAccountId(id: string): void {
    Logger.info('<call setAccountId>', id);
  }
  setDistinctId(id: string): void {
    Logger.info('<call setDistinctId>', id);
  }
  setFirebaseAppInstanceId(id: string): void {
    Logger.info('<call setFirebaseAppInstanceId>', id);
  }
  setAppsFlyerId(id: string): void {
    Logger.info('<call setAppsFlyerId>', id);
  }
  setKochavaId(id: string): void {
    Logger.info('<call setKochavaId>', id);
  }
  setAdjustId(id: string): void {
    Logger.info('<call setAdjustId>', id);
  }
  setStaticCommonProperties(properties: Record<string, string | boolean | number>): void {
    Logger.info('<call setStaticCommonProperties>', properties);
  }
  clearStaticCommonProperties(): void {
    Logger.info('<call clearStaticCommonProperties>');
  }
  setCommonProperties(callback: () => Record<string, string | boolean | number>): void {
    Logger.info('<call setCommonProperties>', callback);
    this.dynamicPropertiesCallback = callback;
  }
  clearCommonProperties(): void {
    Logger.info('<call clearCommonProperties>');
    this.dynamicPropertiesCallback = null;
  }
}
