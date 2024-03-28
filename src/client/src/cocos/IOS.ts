import { DataTower } from '../DataTower';
import { DefaultConfig, IOSClass } from '../constant';
import type { Config } from '../type';
import { fmt, globalNativeCallback } from '../utils';

/**
 * cocos IOS bridge
 */
class IOS extends DataTower {
  protected static instance = new IOS();
  private config: Required<Config> = DefaultConfig;
  private dynamicPropertiesCallback: null | (() => Record<string, any>) = null;
  private callStaticMethod(method: string, ...args: any[]): any {
    return jsb.reflection.callStaticMethod(IOSClass, method, ...args);
  }

  init(config: Config) {
    this.config = Object.assign({}, DefaultConfig, config);
    this.callStaticMethod('initSDK:', fmt(this.config));
  }
  track(eventName: string, properties: Record<string, any>): void {
    properties = { ...properties, ...this.dynamicPropertiesCallback?.() };
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
    // iOS接受字符串
    properties.forEach(prop => this.callStaticMethod('userUnset:', prop));
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
    globalNativeCallback((cb) => this.callStaticMethod('getDataTowerId:', cb), callback);
  }
  getDistinctId(callback: (id: string) => void): void;
  getDistinctId(): Promise<string>;
  getDistinctId(callback?: (id: string) => void): void | Promise<string> {
    if (!callback) return new Promise((resolve) => this.getDistinctId(resolve));
    globalNativeCallback((cb) => this.callStaticMethod('getDistinctId:', cb), callback);
  }
  setAccountId(id: string): void {
    this.callStaticMethod('setAccountId:', id);
  }
  setDistinctId(id: string): void {
    this.callStaticMethod('setDistinctId:', id);
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
  setStaticCommonProperties(properties: Record<string, any>): void {
    this.callStaticMethod('setStaticCommonProperties:', fmt(properties));
  }
  clearStaticCommonProperties(): void {
    this.callStaticMethod('clearStaticCommonProperties');
  }
  setCommonProperties(callback: () => Record<string, any>): void {
    this.dynamicPropertiesCallback = callback;
  }
  clearCommonProperties(): void {
    this.dynamicPropertiesCallback = null;
  }
}

export { IOS as DataTower };
export default IOS;
