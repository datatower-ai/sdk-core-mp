import { DataTower } from '../DataTower';
import { DefaultConfig, IOSClass } from '../constant';
import type { Config } from '../type';
import { fmt } from '../utils';

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
    this.callStaticMethod('initSDK:', fmt(this.config));
  }
  track(eventName: string, properties: Record<string, any>): void {
    this.callStaticMethod('track:properties:', eventName, fmt(properties));
  }
  enableUpload(): void {
    this.callStaticMethod('enableUpload');
  }
  userSet(properties: Record<string, any>): void {
    this.callStaticMethod('userSet:', fmt(properties));
  }
  userSetOnce(properties: Record<string, any>): void {
    this.callStaticMethod('userSetOnce:', fmt(properties));
  }
  userAdd(properties: Record<string, any>): void {
    this.callStaticMethod('userAdd:', fmt(properties));
  }
  userUnset(properties: string[]): void {
    this.callStaticMethod('userUnset:', fmt(properties));
  }
  userDelete(): void {
    this.callStaticMethod('userDelete');
  }
  userAppend(properties: Record<string, any>): void {
    this.callStaticMethod('userAppend:', fmt(properties));
  }
  userUniqAppend(properties: Record<string, any>): void {
    this.callStaticMethod('userUniqAppend:', fmt(properties));
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
    this.callStaticMethod('setCommonProperties:', fmt(properties));
  }
  clearCommonProperties(): void {
    this.callStaticMethod('clearCommonProperties');
  }
  setStaticCommonProperties(properties: Record<string, any>): void {
    this.callStaticMethod('setStaticCommonProperties:', fmt(properties));
  }
  clearStaticCommonProperties(): void {
    this.callStaticMethod('clearStaticCommonProperties');
  }
}

export { IOS as DataTower };
export default IOS;
