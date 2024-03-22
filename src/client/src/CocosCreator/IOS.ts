import { DefaultConfig, IOSClass } from '../constant';
import type { Config } from '../type';
import { logger } from '../utils';

/**
 * cocos creator IOS bridge
 */
export function init(config: Config) {
  config = Object.assign({}, DefaultConfig, config);
  if (config.isDebug) return logger('IOS', 'init', config);
  jsb.reflection.callStaticMethod(IOSClass, 'initSDK:', config);
}
export function track(eventName: string, properties?: Record<string, any>): void {
  jsb.reflection.callStaticMethod(IOSClass, 'track:properties:', eventName, properties);
}
export function enableTrack(): void {
  jsb.reflection.callStaticMethod(IOSClass, 'enableTrack');
}
export function userSet(properties: Record<string, any>): void {
  jsb.reflection.callStaticMethod(IOSClass, 'userSet:', properties);
}
export function userSetOnce(properties: Record<string, any>): void {
  jsb.reflection.callStaticMethod(IOSClass, 'userSetOnce:', properties);
}
export function userAdd(properties: Record<string, any>): void {
  jsb.reflection.callStaticMethod(IOSClass, 'userAdd:', properties);
}
export function userUnset(...properties: string[]): void {
  jsb.reflection.callStaticMethod(IOSClass, 'userUnset:', properties);
}
export function userDel(): void {
  jsb.reflection.callStaticMethod(IOSClass, 'userDel');
}
export function userAppend(...properties: string[]): void {
  jsb.reflection.callStaticMethod(IOSClass, 'userAppend:', properties);
}
export function userUniqAppend(...properties: string[]): void {
  jsb.reflection.callStaticMethod(IOSClass, 'userUniqAppend:', properties);
}
export function getDataTowerId(callback: (id: string) => void): void;
export function getDataTowerId(): Promise<string>;
export function getDataTowerId(callback?: (id: string) => void): void | Promise<string> {
  if (!callback) return new Promise((resolve) => getDataTowerId(resolve));
  jsb.reflection.callStaticMethod(IOSClass, 'getDataTowerId:', callback);
}
export function setAccountId(id: string): void {
  jsb.reflection.callStaticMethod(IOSClass, 'setAccountId:', id);
}
export function setDistinctId(id: string): void {
  jsb.reflection.callStaticMethod(IOSClass, 'setDistinctId:', id);
}
export function getDistinctId(): string | void | null {
  jsb.reflection.callStaticMethod(IOSClass, 'getDistinctId');
}
export function setFirebaseAppInstanceId(id: string): void {
  jsb.reflection.callStaticMethod(IOSClass, 'setFirebaseAppInstanceId:', id);
}
export function setAppsFlyerId(id: string): void {
  jsb.reflection.callStaticMethod(IOSClass, 'setAppsFlyerId:', id);
}
export function setKochavaId(id: string): void {
  jsb.reflection.callStaticMethod(IOSClass, 'setKochavaId:', id);
}
export function setAdjustId(id: string): void {
  jsb.reflection.callStaticMethod(IOSClass, 'setAdjustId:', id);
}
export function setCommonProperties(properties: Record<string, any>): void {
  jsb.reflection.callStaticMethod(IOSClass, 'setCommonProperties:', properties);
}
export function clearCommonProperties(): void {
  jsb.reflection.callStaticMethod(IOSClass, 'clearCommonProperties');
}
export function setStaticCommonProperties(properties: Record<string, any>): void {
  jsb.reflection.callStaticMethod(IOSClass, 'setStaticCommonProperties:', properties);
}
export function clearStaticCommonProperties(): void {
  jsb.reflection.callStaticMethod(IOSClass, 'clearStaticCommonProperties');
}
