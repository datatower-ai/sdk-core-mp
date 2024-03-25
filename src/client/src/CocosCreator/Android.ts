import { DataTower } from '../DataTower';
import { AndroidClass, DefaultConfig } from '../constant';
import type { Config } from '../type';
import { format, generateSignature } from '../utils';

/**
 * cocos creator Android bridge
 */
class Android extends DataTower {
  static instance = new Android();
  private config: Config = DefaultConfig;
  constructor(config?: Config) {
    super();
    if (config) this.init(config);
  }

  private callStaticMethod(method: string, signature?: Parameters<typeof generateSignature>[0], ...args: any[]): any {
    const params = signature ? [generateSignature(signature), ...args] : [];
    return jsb.reflection.callStaticMethod(AndroidClass, method, ...params);
  }

  init(config: Config): void {
    this.config = Object.assign({}, DefaultConfig, config);
    this.callStaticMethod('initSDK', ['map'], format(this.config));
  }
  track(eventName: string, properties?: Record<string, any>): void {
    this.callStaticMethod('track', ['string', 'map'], eventName, format(properties));
  }
  enableTrack(): void {
    this.callStaticMethod('enableTrack');
  }
  userSet(properties: Record<string, any>): void {
    this.callStaticMethod('userSet', ['map'], format(properties));
  }
  userSetOnce(properties: Record<string, any>): void {
    this.callStaticMethod('userSetOnce', ['map'], format(properties));
  }
  userAdd(properties: Record<string, any>): void {
    this.callStaticMethod('userAdd', ['map'], format(properties));
  }
  userUnset(...properties: string[]): void {
    this.callStaticMethod('userUnset', ['array'], format(properties));
  }
  userDel(): void {
    this.callStaticMethod('userDel');
  }
  userAppend(...properties: string[]): void {
    this.callStaticMethod('userAppend', ['array'], format(properties));
  }
  userUniqAppend(...properties: string[]): void {
    this.callStaticMethod('userUniqAppend', ['array'], format(properties));
  }
  getDataTowerId(callback: (id: string) => void): void;
  getDataTowerId(): Promise<string>;
  getDataTowerId(callback?: (id: string) => void): void | Promise<string> {
    if (!callback) return new Promise((resolve) => this.getDataTowerId(resolve));
    this.callStaticMethod('getDataTowerId', ['string'], callback);
  }
  setAccountId(id: string): void {
    this.callStaticMethod('setAccountId', ['string'], id);
  }
  setDistinctId(id: string): void {
    this.callStaticMethod('setDistinctId', ['string'], id);
  }
  getDistinctId(): string | void | null {
    this.callStaticMethod('getDistinctId');
  }
  setFirebaseAppInstanceId(id: string): void {
    this.callStaticMethod('setFirebaseAppInstanceId', ['string'], id);
  }
  setAppsFlyerId(id: string): void {
    this.callStaticMethod('setAppsFlyerId', ['string'], id);
  }
  setKochavaId(id: string): void {
    this.callStaticMethod('setKochavaId', ['string'], id);
  }
  setAdjustId(id: string): void {
    this.callStaticMethod('setAdjustId', ['string'], id);
  }
  setCommonProperties(properties: Record<string, any>): void {
    this.callStaticMethod('setCommonProperties', ['map'], format(properties));
  }
  clearCommonProperties(): void {
    this.callStaticMethod('clearCommonProperties');
  }
  setStaticCommonProperties(properties: Record<string, any>): void {
    this.callStaticMethod('setStaticCommonProperties', ['map'], format(properties));
  }
  clearStaticCommonProperties(): void {
    this.callStaticMethod('clearStaticCommonProperties');
  }
}

export { Android as DataTower };
export default Android;
