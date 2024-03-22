import { AndroidClass, DefaultConfig } from '../constant';
import type { Config } from '../type';
import { generateSignature, logger } from '../utils';

/**
 * cocos creator Android bridge
 */
export function init(config: Config) {
  config = Object.assign({}, DefaultConfig, config);
  if (config.isDebug) return logger('Android', 'init', config);
  jsb.reflection.callStaticMethod(AndroidClass, 'initSDK', generateSignature(['map']), config);
}
export function track(eventName: string, properties?: Record<string, any>): void {
  jsb.reflection.callStaticMethod(AndroidClass, 'track', generateSignature(['string', 'map']), eventName, properties);
}
export function enableTrack(): void {
  jsb.reflection.callStaticMethod(AndroidClass, 'enableTrack');
}
export function userSet(properties: Record<string, any>): void {
  jsb.reflection.callStaticMethod(AndroidClass, 'userSet', generateSignature(['map']), properties);
}
export function userSetOnce(properties: Record<string, any>): void {
  jsb.reflection.callStaticMethod(AndroidClass, 'userSetOnce', generateSignature(['map']), properties);
}
export function userAdd(properties: Record<string, any>): void {
  jsb.reflection.callStaticMethod(AndroidClass, 'userAdd', generateSignature(['map']), properties);
}
export function userUnset(...properties: string[]): void {
  jsb.reflection.callStaticMethod(AndroidClass, 'userUnset', generateSignature(['array']), properties);
}
export function userDel(): void {
  jsb.reflection.callStaticMethod(AndroidClass, 'userDel');
}
export function userAppend(...properties: string[]): void {
  jsb.reflection.callStaticMethod(AndroidClass, 'userAppend', generateSignature(['array']), properties);
}
export function userUniqAppend(...properties: string[]): void {
  jsb.reflection.callStaticMethod(AndroidClass, 'userUniqAppend', generateSignature(['array']), properties);
}
export function getDataTowerId(callback: (id: string) => void): void;
export function getDataTowerId(): Promise<string>;
export function getDataTowerId(callback?: (id: string) => void): void | Promise<string> {
  if (!callback) return new Promise((resolve) => getDataTowerId(resolve));
  jsb.reflection.callStaticMethod(AndroidClass, 'getDataTowerId', generateSignature(['string']), callback);
}
export function setAccountId(id: string): void {
  jsb.reflection.callStaticMethod(AndroidClass, 'setAccountId', generateSignature(['string']), id);
}
export function setDistinctId(id: string): void {
  jsb.reflection.callStaticMethod(AndroidClass, 'setDistinctId', generateSignature(['string']), id);
}
export function getDistinctId(): string | void | null {
  jsb.reflection.callStaticMethod(AndroidClass, 'getDistinctId');
}
export function setFirebaseAppInstanceId(id: string): void {
  jsb.reflection.callStaticMethod(AndroidClass, 'setFirebaseAppInstanceId', generateSignature(['string']), id);
}
export function setAppsFlyerId(id: string): void {
  jsb.reflection.callStaticMethod(AndroidClass, 'setAppsFlyerId', generateSignature(['string']), id);
}
export function setKochavaId(id: string): void {
  jsb.reflection.callStaticMethod(AndroidClass, 'setKochavaId', generateSignature(['string']), id);
}
export function setAdjustId(id: string): void {
  jsb.reflection.callStaticMethod(AndroidClass, 'setAdjustId', generateSignature(['string']), id);
}
export function setCommonProperties(properties: Record<string, any>): void {
  jsb.reflection.callStaticMethod(AndroidClass, 'setCommonProperties', generateSignature(['map']), properties);
}
export function clearCommonProperties(): void {
  jsb.reflection.callStaticMethod(AndroidClass, 'clearCommonProperties');
}
export function setStaticCommonProperties(properties: Record<string, any>): void {
  jsb.reflection.callStaticMethod(AndroidClass, 'setStaticCommonProperties', generateSignature(['map']), properties);
}
export function clearStaticCommonProperties(): void {
  jsb.reflection.callStaticMethod(AndroidClass, 'clearStaticCommonProperties');
}
