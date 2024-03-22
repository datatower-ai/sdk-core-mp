import { DataTower } from '../DataTower';
import { AndroidClass, DefaultConfig } from '../constant';
import type { Config } from '../type';
import { format, generateSignature, logger } from '../utils';

/**
 * cocos creator Android bridge
 */
class Android extends DataTower {
  constructor(config?: Config) {
    super();
    if (config) this.init(config);
  }

  init(config: Config) {
    config = Object.assign({}, DefaultConfig, config);
    if (config.isDebug) return logger('Android', 'init', config);
    jsb.reflection.callStaticMethod(AndroidClass, 'initSDK', generateSignature(['map']), format(config));
  }
  track(eventName: string, properties?: Record<string, any>): void {
    jsb.reflection.callStaticMethod(
      AndroidClass,
      'track',
      generateSignature(['string', 'map']),
      eventName,
      format(properties),
    );
  }
  enableTrack(): void {
    jsb.reflection.callStaticMethod(AndroidClass, 'enableTrack');
  }
  userSet(properties: Record<string, any>): void {
    jsb.reflection.callStaticMethod(AndroidClass, 'userSet', generateSignature(['map']), format(properties));
  }
  userSetOnce(properties: Record<string, any>): void {
    jsb.reflection.callStaticMethod(AndroidClass, 'userSetOnce', generateSignature(['map']), format(properties));
  }
  userAdd(properties: Record<string, any>): void {
    jsb.reflection.callStaticMethod(AndroidClass, 'userAdd', generateSignature(['map']), format(properties));
  }
  userUnset(...properties: string[]): void {
    jsb.reflection.callStaticMethod(AndroidClass, 'userUnset', generateSignature(['array']), format(properties));
  }
  userDel(): void {
    jsb.reflection.callStaticMethod(AndroidClass, 'userDel');
  }
  userAppend(...properties: string[]): void {
    jsb.reflection.callStaticMethod(AndroidClass, 'userAppend', generateSignature(['array']), format(properties));
  }
  userUniqAppend(...properties: string[]): void {
    jsb.reflection.callStaticMethod(AndroidClass, 'userUniqAppend', generateSignature(['array']), format(properties));
  }
  getDataTowerId(callback: (id: string) => void): void;
  getDataTowerId(): Promise<string>;
  getDataTowerId(callback?: (id: string) => void): void | Promise<string> {
    if (!callback) return new Promise((resolve) => this.getDataTowerId(resolve));
    jsb.reflection.callStaticMethod(AndroidClass, 'getDataTowerId', generateSignature(['string']), callback);
  }
  setAccountId(id: string): void {
    jsb.reflection.callStaticMethod(AndroidClass, 'setAccountId', generateSignature(['string']), id);
  }
  setDistinctId(id: string): void {
    jsb.reflection.callStaticMethod(AndroidClass, 'setDistinctId', generateSignature(['string']), id);
  }
  getDistinctId(): string | void | null {
    jsb.reflection.callStaticMethod(AndroidClass, 'getDistinctId');
  }
  setFirebaseAppInstanceId(id: string): void {
    jsb.reflection.callStaticMethod(AndroidClass, 'setFirebaseAppInstanceId', generateSignature(['string']), id);
  }
  setAppsFlyerId(id: string): void {
    jsb.reflection.callStaticMethod(AndroidClass, 'setAppsFlyerId', generateSignature(['string']), id);
  }
  setKochavaId(id: string): void {
    jsb.reflection.callStaticMethod(AndroidClass, 'setKochavaId', generateSignature(['string']), id);
  }
  setAdjustId(id: string): void {
    jsb.reflection.callStaticMethod(AndroidClass, 'setAdjustId', generateSignature(['string']), id);
  }
  setCommonProperties(properties: Record<string, any>): void {
    jsb.reflection.callStaticMethod(AndroidClass, 'setCommonProperties', generateSignature(['map']), format(properties));
  }
  clearCommonProperties(): void {
    jsb.reflection.callStaticMethod(AndroidClass, 'clearCommonProperties');
  }
  setStaticCommonProperties(properties: Record<string, any>): void {
    jsb.reflection.callStaticMethod(AndroidClass, 'setStaticCommonProperties', generateSignature(['map']), format(properties));
  }
  clearStaticCommonProperties(): void {
    jsb.reflection.callStaticMethod(AndroidClass, 'clearStaticCommonProperties');
  }
}

DataTower.instance = new Android();
export { Android as DataTower };
export default Android;
