import { version } from '$/package.json';
import type { DataTower } from '@/StaticDataTower';
import { DEFAULT_INITIAL_CONFIG } from '@/constant';
import type { Config } from '@/type';
import { debounce } from '@/utils';
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
  private config: Config = DEFAULT_INITIAL_CONFIG;
  private properties: Record<string, string | boolean | number> = { '#sdk_type': 'js', '#sdk_version_name': version };
  private dynamicPropertiesCallback: null | (() => Record<string, string | boolean | number>) = null;
  private taskQueue: TaskQueue<Record<string, any>, true> = new TaskQueue();

  constructor(private shim: MiniShim | QuickAppShim | QuickGameShim | WebShim) {}

  init(config: Config) {
    this.config = { ...DEFAULT_INITIAL_CONFIG, ...config };
    Logger.level = this.config.logLevel;

    this.taskQueue.onMaxSize(() => this.enableUpload());
    if (this.config.manualEnableUpload) this.taskQueue.setMaxSize(Infinity);
    else this.taskQueue.onEnqueue(debounce(() => this.enableUpload(), 10000));

    Logger.info('<call init>', config);
  }
  track(eventName: string, properties: Record<string, string | boolean | number>): void {
    Logger.info('<call track>', eventName, properties);
    this.taskQueue.enqueue(() => ({ ...properties, ...this.properties, ...this.dynamicPropertiesCallback?.() }));
  }
  enableUpload(): void {
    Logger.info('<call enableUpload>');
    this.shim.request({ url: this.config.serverUrl, data: this.taskQueue.flush() });
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
