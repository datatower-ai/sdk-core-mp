import { version } from '@/package.json';
import { StaticDataTower } from '@/src/StaticDataTower';
import { DEFAULT_INITIAL_CONFIG, IOSClass } from '@/src/constant';
import type { Config, PublicKey } from '@/src/type';
import { fmt, globalNativeCallback } from '@/src/utils';

/**
 * cocos CocosIOS bridge
 */
export class CocosIOS extends StaticDataTower {
  protected static instance = new CocosIOS();
  private staticProperties = { '#sdk_type': 'js', '#sdk_version_name': version };
  private dynamicProperties: null | (() => Record<string, string | boolean | number>) = null;

  private static callStaticMethod(method: string, ...args: any[]): any {
    return globalThis.jsb.reflection.callStaticMethod(IOSClass, method, ...args);
  }

  async init(config: Config) {
    config = Object.assign({}, DEFAULT_INITIAL_CONFIG, config, { properties: this.staticProperties });
    CocosIOS.callStaticMethod('initSDK:', fmt(config));
  }
  track(eventName: string, properties: Record<string, string | boolean | number>): void {
    properties = { ...properties, ...this.dynamicProperties?.() };
    CocosIOS.callStaticMethod('track:properties:', eventName, fmt(properties));
  }
  enableUpload(): void {
    CocosIOS.callStaticMethod('enableUpload');
  }
  userSet<K extends string>(properties: Record<PublicKey<K>, string | boolean | number>): void {
    CocosIOS.callStaticMethod('userSet:', fmt(properties));
  }
  userSetOnce<K extends string>(properties: Record<PublicKey<K>, string | boolean | number>): void {
    CocosIOS.callStaticMethod('userSetOnce:', fmt(properties));
  }
  userAdd<K extends string>(properties: Record<PublicKey<K>, number>): void {
    CocosIOS.callStaticMethod('userAdd:', fmt(properties));
  }
  userUnset(properties: string[]): void {
    // iOS接受字符串
    properties.forEach((prop) => CocosIOS.callStaticMethod('userUnset:', prop));
  }
  userDelete(): void {
    CocosIOS.callStaticMethod('userDelete');
  }
  userAppend<K extends string>(properties: Record<PublicKey<K>, any[]>): void {
    CocosIOS.callStaticMethod('userAppend:', fmt(properties));
  }
  userUniqAppend<K extends string>(properties: Record<PublicKey<K>, any[]>): void {
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
  setStaticCommonProperties<K extends string>(properties: Record<PublicKey<K>, string | boolean | number>): void {
    CocosIOS.callStaticMethod('setStaticCommonProperties:', fmt(properties));
  }
  clearStaticCommonProperties(): void {
    CocosIOS.callStaticMethod('clearStaticCommonProperties');
  }
  setCommonProperties(callback: () => Record<string, string | boolean | number>): void {
    this.dynamicProperties = callback;
  }
  clearCommonProperties(): void {
    this.dynamicProperties = null;
  }
}

export { CocosIOS as DataTower };
export default CocosIOS;
