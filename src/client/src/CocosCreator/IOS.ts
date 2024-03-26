import { DataTower } from '../DataTower';
import { DefaultConfig, IOSClass } from '../constant';
import type { Config } from '../type';
import { format } from '../utils';

/**
 * cocos creator IOS bridge
 */
class IOS extends DataTower {
  static instance = new IOS();
  private config: Config = DefaultConfig;
  constructor(config?: Config) {
    super();
    if (config) this.init(config);
  }

  private callStaticMethod(method: string, ...args: any[]): any {
    return jsb.reflection.callStaticMethod(IOSClass, method, ...args);
  }

  init(config: Config) {
    this.config = Object.assign({}, DefaultConfig, config);
    this.callStaticMethod('initSDK:', format(this.config));
  }
  track(eventName: string, properties: Record<string, any>): void {
    this.callStaticMethod('track:properties:', eventName, format(properties));
  }
  enableTrack(): void {
    this.callStaticMethod('enableTrack');
  }
  userSet(properties: Record<string, any>): void {
    this.callStaticMethod('userSet:', format(properties));
  }
  userSetOnce(properties: Record<string, any>): void {
    this.callStaticMethod('userSetOnce:', format(properties));
  }
  userAdd(properties: Record<string, any>): void {
    this.callStaticMethod('userAdd:', format(properties));
  }
  userUnset(...properties: string[]): void {
    this.callStaticMethod('userUnset:', format(properties));
  }
  userDel(): void {
    this.callStaticMethod('userDel');
  }
  userAppend(...properties: string[]): void {
    this.callStaticMethod('userAppend:', format(properties));
  }
  userUniqAppend(...properties: string[]): void {
    this.callStaticMethod('userUniqAppend:', format(properties));
  }
  getDataTowerId(callback: (id: string) => void): void;
  getDataTowerId(): Promise<string>;
  getDataTowerId(callback?: (id: string) => void): void | Promise<string> {
    if (!callback) return new Promise((resolve) => this.getDataTowerId(resolve));
    this.callStaticMethod('getDataTowerId:', callback);
  }
  setAccountId(id: string): void {
    this.callStaticMethod('setAccountId:', id);
  }
  setDistinctId(id: string): void {
    this.callStaticMethod('setDistinctId:', id);
  }
  getDistinctId(callback: (id: string) => void): void;
  getDistinctId(): Promise<string>;
  getDistinctId(callback?: (id: string) => void): void | Promise<string> {
    if (!callback) return new Promise((resolve) => this.getDistinctId(resolve));
    this.callStaticMethod('getDistinctId:', callback);
  }
  setFirebaseAppInstanceId(id: string): void {
    this.callStaticMethod('setFirebaseAppInstanceId:', id);
  }
  setAppsFlyerId(id: string): void {
    this.callStaticMethod('setAppsFlyerId:', id);
  }
  setKochavaId(id: string): void {
    this.callStaticMethod('setKochavaId:', id);
  }
  setAdjustId(id: string): void {
    this.callStaticMethod('setAdjustId:', id);
  }
  setCommonProperties(properties: Record<string, any>): void {
    this.callStaticMethod('setCommonProperties:', format(properties));
  }
  clearCommonProperties(): void {
    this.callStaticMethod('clearCommonProperties');
  }
  setStaticCommonProperties(properties: Record<string, any>): void {
    this.callStaticMethod('setStaticCommonProperties:', format(properties));
  }
  clearStaticCommonProperties(): void {
    this.callStaticMethod('clearStaticCommonProperties');
  }
}

export { IOS as DataTower };
export default IOS;
