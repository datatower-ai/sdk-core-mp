import { DefaultConfig } from '../constant';
import type { Config } from '../type';
import { logger } from '../utils';
import type { MiniShim } from './shim/MiniShim';
import type { QuickAppShim } from './shim/QuickAppShim';
import type { QuickGameShim } from './shim/QuickGameShim';
import type { WebShim } from './shim/WebShim';

// TODO: Sandbox
export class Sandbox {
  private config: Required<Config> = DefaultConfig;
  constructor(protected shim: MiniShim | QuickAppShim | QuickGameShim | WebShim) {}
  private logger(method: string, ...args: any[]) {
    logger('<Sandbox>', method, args);
  }

  init(config: Config) {
    this.config = Object.assign({}, DefaultConfig, config);
    if (this.config.isDebug) return this.logger('init', this.config);
  }
  track(eventName: string, properties?: Record<string, any>): void {
    if (this.config.isDebug) return this.logger('track', eventName, properties);
  }
  enableUpload(): void {
    if (this.config.isDebug) return this.logger('enableUpload');
  }
  userSet(properties: Record<string, any>): void {
    if (this.config.isDebug) return this.logger('userSet', properties);
  }
  userSetOnce(properties: Record<string, any>): void {
    if (this.config.isDebug) return this.logger('userSetOnce', properties);
  }
  userAdd(properties: Record<string, any>): void {
    if (this.config.isDebug) return this.logger('userAdd', properties);
  }
  userUnset(properties: string[]): void {
    if (this.config.isDebug) return this.logger('userUnset', properties);
  }
  userDelete(): void {
    if (this.config.isDebug) return this.logger('userDelete');
  }
  userAppend(properties: Record<string, any>): void {
    if (this.config.isDebug) return this.logger('userAppend', properties);
  }
  userUniqAppend(properties: Record<string, any>): void {
    if (this.config.isDebug) return this.logger('userUniqAppend', properties);
  }
  getDataTowerId(callback: (id: string) => void): void;
  getDataTowerId(): Promise<string>;
  getDataTowerId(callback?: (id: string) => void): void | Promise<string> {
    if (!callback) return new Promise((resolve) => this.getDataTowerId(resolve));
    if (this.config.isDebug) return this.logger('getDataTowerId', callback);
  }
  getDistinctId(callback: (id: string) => void): void;
  getDistinctId(): Promise<string>;
  getDistinctId(callback?: (id: string) => void): void | Promise<string> {
    if (!callback) return new Promise((resolve) => this.getDistinctId(resolve));
    if (this.config.isDebug) return this.logger('getDistinctId');
  }
  setAccountId(id: string): void {
    if (this.config.isDebug) return this.logger('setAccountId', id);
  }
  setDistinctId(id: string): void {
    if (this.config.isDebug) return this.logger('setDistinctId', id);
  }
  setFirebaseAppInstanceId(id: string): void {
    if (this.config.isDebug) return this.logger('setFirebaseAppInstanceId', id);
  }
  setAppsFlyerId(id: string): void {
    if (this.config.isDebug) return this.logger('setAppsFlyerId', id);
  }
  setKochavaId(id: string): void {
    if (this.config.isDebug) return this.logger('setKochavaId', id);
  }
  setAdjustId(id: string): void {
    if (this.config.isDebug) return this.logger('setAdjustId', id);
  }
  setStaticCommonProperties(properties: Record<string, any>): void {
    if (this.config.isDebug) return this.logger('setStaticCommonProperties', properties);
  }
  clearStaticCommonProperties(): void {
    if (this.config.isDebug) return this.logger('clearStaticCommonProperties');
  }
  setCommonProperties(callback: () => Record<string, any>): void {
    if (this.config.isDebug) return this.logger('setCommonProperties', callback);
  }
  clearCommonProperties(): void {
    if (this.config.isDebug) return this.logger('clearCommonProperties');
  }
}
