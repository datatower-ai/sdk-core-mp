import { DataTower } from '../DataTower';
import { DefaultConfig, IOSClass } from '../constant';
import type { Config } from '../type';
import { format, logger } from '../utils';

/**
 * cocos creator IOS bridge
 */
class IOS extends DataTower {
  static instance = new IOS();
  constructor(config?: Config) {
    super();
    if (config) this.init(config);
  }
  init(config: Config) {
    config = Object.assign({}, DefaultConfig, config);
    console.log("lilinli invoke iOS init, config is " + format(config));
    jsb.reflection.callStaticMethod(IOSClass, 'initSDK:', format(config));
  }
  track(eventName: string, properties?: Record<string, any>): void {
    jsb.reflection.callStaticMethod(IOSClass, 'trackEvent:properties:', eventName, format(properties));
  }
  enableTrack(): void {
    jsb.reflection.callStaticMethod(IOSClass, 'enableTrack');
  }
  userSet(properties: Record<string, any>): void {
    jsb.reflection.callStaticMethod(IOSClass, 'userSet:', format(properties));
  }
  userSetOnce(properties: Record<string, any>): void {
    jsb.reflection.callStaticMethod(IOSClass, 'userSetOnce:', format(properties));
  }
  userAdd(properties: Record<string, any>): void {
    jsb.reflection.callStaticMethod(IOSClass, 'userAdd:', format(properties));
  }
  userUnset(...properties: string[]): void {
    jsb.reflection.callStaticMethod(IOSClass, 'userUnset:', format(properties));
  }
  userDel(): void {
    jsb.reflection.callStaticMethod(IOSClass, 'userDel');
  }
  userAppend(...properties: string[]): void {
    jsb.reflection.callStaticMethod(IOSClass, 'userAppend:', format(properties));
  }
  userUniqAppend(...properties: string[]): void {
    jsb.reflection.callStaticMethod(IOSClass, 'userUniqAppend:', format(properties));
  }
  getDataTowerId(callback: (id: string) => void): void;
  getDataTowerId(): Promise<string>;
  getDataTowerId(callback?: (id: string) => void): void | Promise<string> {
    if (!callback) return new Promise((resolve) => this.getDataTowerId(resolve));
    console.log('lilinli invoke getDataTowerId');
    jsb.reflection.callStaticMethod(IOSClass, 'getDataTowerId');
  }
  setAccountId(id: string): void {
    jsb.reflection.callStaticMethod(IOSClass, 'setAccountId:', id);
  }
  setDistinctId(id: string): void {
    jsb.reflection.callStaticMethod(IOSClass, 'setDistinctId:', id);
  }
  getDistinctId(): string | void | null {
    jsb.reflection.callStaticMethod(IOSClass, 'getDistinctId');
  }
  setFirebaseAppInstanceId(id: string): void {
    jsb.reflection.callStaticMethod(IOSClass, 'setFirebaseAppInstanceId:', id);
  }
  setAppsFlyerId(id: string): void {
    jsb.reflection.callStaticMethod(IOSClass, 'setAppsFlyerId:', id);
  }
  setKochavaId(id: string): void {
    jsb.reflection.callStaticMethod(IOSClass, 'setKochavaId:', id);
  }
  setAdjustId(id: string): void {
    jsb.reflection.callStaticMethod(IOSClass, 'setAdjustId:', id);
  }
  setCommonProperties(properties: Record<string, any>): void {
    jsb.reflection.callStaticMethod(IOSClass, 'setCommonProperties:', format(properties));
  }
  clearCommonProperties(): void {
    jsb.reflection.callStaticMethod(IOSClass, 'clearCommonProperties');
  }
  setStaticCommonProperties(properties: Record<string, any>): void {
    jsb.reflection.callStaticMethod(IOSClass, 'setStaticCommonProperties:', format(properties));
  }
  clearStaticCommonProperties(): void {
    jsb.reflection.callStaticMethod(IOSClass, 'clearStaticCommonProperties');
  }
}

export { IOS as DataTower };
export default IOS;
