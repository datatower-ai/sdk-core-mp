import { DataTower } from '../DataTower';
import { DefaultConfig } from '../constant';
import type { Config } from '../type';
import { logger } from '../utils';
export * from '../type';

// TODO: 待实现
class Web extends DataTower {
  static instance = new Web();
  private config: Config = DefaultConfig;
  constructor(config?: Config) {
    super();
    if (config) this.init(config);
  }
  private logger(method: string, ...args: any[]) {
    logger('<Web>', method, args);
  }

  init(config: Config) {
    this.config = Object.assign({}, DefaultConfig, config);
    if (this.config.isDebug) return this.logger('init', this.config);
  }
  track(eventName: string, properties?: Record<string, any>): void {
    if (this.config.isDebug) return this.logger('track', eventName, properties);
  }
  enableTrack(): void {
    if (this.config.isDebug) return this.logger('enableTrack');
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
  userUnset(...properties: string[]): void {
    if (this.config.isDebug) return this.logger('userUnset', properties);
  }
  userDel(): void {
    if (this.config.isDebug) return this.logger('userDel');
  }
  userAppend(...properties: string[]): void {
    if (this.config.isDebug) return this.logger('userAppend', properties);
  }
  userUniqAppend(...properties: string[]): void {
    if (this.config.isDebug) return this.logger('userUniqAppend', properties);
  }
  getDataTowerId(callback: (id: string) => void): void;
  getDataTowerId(): Promise<string>;
  getDataTowerId(callback?: (id: string) => void): void | Promise<string> {
    if (!callback) return new Promise((resolve) => this.getDataTowerId(resolve));
    if (this.config.isDebug) return this.logger('getDataTowerId', callback);
  }
  setAccountId(id: string): void {
    if (this.config.isDebug) return this.logger('setAccountId', id);
  }
  setDistinctId(id: string): void {
    if (this.config.isDebug) return this.logger('setDistinctId', id);
  }

  getDistinctId(callback: (id: string) => void): void;
  getDistinctId(): Promise<string>;
  getDistinctId(callback?: (id: string) => void): void | Promise<string> {
    if (!callback) return new Promise((resolve) => this.getDistinctId(resolve));
    if (this.config.isDebug) return this.logger('getDistinctId');
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
  setCommonProperties(properties: Record<string, any>): void {
    if (this.config.isDebug) return this.logger('setCommonProperties', properties);
  }
  clearCommonProperties(): void {
    if (this.config.isDebug) return this.logger('clearCommonProperties');
  }
  setStaticCommonProperties(properties: Record<string, any>): void {
    if (this.config.isDebug) return this.logger('setStaticCommonProperties', properties);
  }
  clearStaticCommonProperties(): void {
    if (this.config.isDebug) return this.logger('clearStaticCommonProperties');
  }
}

export { Web as DataTower };
export default Web;
