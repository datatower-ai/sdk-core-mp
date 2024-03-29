import { version } from '$/package.json';
import { StaticDataTower } from '@/StaticDataTower';
import { IOSClass, DEFAULT_INITIAL_CONFIG } from '@/constant';
import type { Config } from '@/type';
import { fmt, globalNativeCallback } from '@/utils';

/**
 * cocos CocosIOS bridge
 */
export class CocosIOS extends StaticDataTower {
  protected static instance = new CocosIOS();
  private properties: Record<string, string | boolean | number> = { '#sdk_type': 'js', '#sdk_version_name': version };
  private dynamicPropertiesCallback: null | (() => Record<string, string | boolean | number>) = null;

  private static callStaticMethod(method: string, ...args: any[]): any {
    return globalThis.jsb.reflection.callStaticMethod(IOSClass, method, ...args);
  }

  init(config: Config) {
    config = Object.assign({}, DEFAULT_INITIAL_CONFIG, config, this.properties);
    CocosIOS.callStaticMethod('initSDK:', fmt(config));
  }
  track(eventName: string, properties: Record<string, string | boolean | number>): void {
    properties = { ...properties, ...this.dynamicPropertiesCallback?.() };
    CocosIOS.callStaticMethod('track:properties:', eventName, fmt(properties));
  }
  enableUpload(): void {
    CocosIOS.callStaticMethod('enableUpload');
  }
  userSet(properties: Record<string, string | boolean | number>): void {
    CocosIOS.callStaticMethod('userSet:', fmt(properties));
  }
  userSetOnce(properties: Record<string, string | boolean | number>): void {
    CocosIOS.callStaticMethod('userSetOnce:', fmt(properties));
  }
  userAdd(properties: Record<string, number>): void {
    CocosIOS.callStaticMethod('userAdd:', fmt(properties));
  }
  userUnset(properties: string[]): void {
    // iOS接受字符串
    properties.forEach((prop) => CocosIOS.callStaticMethod('userUnset:', prop));
  }
  userDelete(): void {
    CocosIOS.callStaticMethod('userDelete');
  }
  userAppend(properties: Record<string, string | boolean | number>): void {
    CocosIOS.callStaticMethod('userAppend:', fmt(properties));
  }
  userUniqAppend(properties: Record<string, any[]>): void {
    CocosIOS.callStaticMethod('userUniqAppend:', fmt(properties));
  }
  getDataTowerId(callback: (id: string) => void): void;
  getDataTowerId(): Promise<string>;
  getDataTowerId(callback?: (id: string) => void): void | Promise<string> {
    if (!callback) return new Promise((resolve) => this.getDataTowerId(resolve));
    globalNativeCallback((cb) => CocosIOS.callStaticMethod('getDataTowerId:', cb), callback);
  }
  getDistinctId(callback: (id: string) => void): void;
  getDistinctId(): Promise<string>;
  getDistinctId(callback?: (id: string) => void): void | Promise<string> {
    if (!callback) return new Promise((resolve) => this.getDistinctId(resolve));
    globalNativeCallback((cb) => CocosIOS.callStaticMethod('getDistinctId:', cb), callback);
  }
  setAccountId(id: string): void {
    CocosIOS.callStaticMethod('setAccountId:', id);
  }
  setDistinctId(id: string): void {
    CocosIOS.callStaticMethod('setDistinctId:', id);
  }
  setFirebaseAppInstanceId(id: string): void {
    CocosIOS.callStaticMethod('setFirebaseAppInstanceId:', id);
  }
  setAppsFlyerId(id: string): void {
    CocosIOS.callStaticMethod('setAppsFlyerId:', id);
  }
  setKochavaId(id: string): void {
    CocosIOS.callStaticMethod('setKochavaId:', id);
  }
  setAdjustId(id: string): void {
    CocosIOS.callStaticMethod('setAdjustId:', id);
  }
  setStaticCommonProperties(properties: Record<string, string | boolean | number>): void {
    CocosIOS.callStaticMethod('setStaticCommonProperties:', fmt(properties));
  }
  clearStaticCommonProperties(): void {
    CocosIOS.callStaticMethod('clearStaticCommonProperties');
  }
  setCommonProperties(callback: () => Record<string, string | boolean | number>): void {
    this.dynamicPropertiesCallback = callback;
  }
  clearCommonProperties(): void {
    this.dynamicPropertiesCallback = null;
  }
}

export { CocosIOS as DataTower };
export default CocosIOS;
