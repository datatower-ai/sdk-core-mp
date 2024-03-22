import { Config } from '../type';
import { logger } from '../utils';

const CurrentPlatform: any = new Proxy(
  {},
  {
    get(target, key: string) {
      return (...args: any[]) => console.log(`${key}(${args.join(', ')})`);
    },
  },
);

export function init(config: Config) {
  if (config.isDebug) return logger('Web', 'init', config);
  CurrentPlatform.init(config);
}
export function track(eventName: string, properties?: Record<string, any>): void {
  CurrentPlatform.track(eventName, properties);
}
export function enableTrack(): void {
  CurrentPlatform.enableTrack();
}
export function userSet(properties: Record<string, any>): void {
  CurrentPlatform.userSet(properties);
}
export function userSetOnce(properties: Record<string, any>): void {
  CurrentPlatform.userSetOnce(properties);
}
export function userAdd(properties: Record<string, any>): void {
  CurrentPlatform.userAdd(properties);
}
export function userUnset(...properties: string[]): void {
  CurrentPlatform.userUnset(...properties);
}
export function userDel(): void {
  CurrentPlatform.userDel();
}
export function userAppend(...properties: string[]): void {
  CurrentPlatform.userAppend(...properties);
}
export function userUniqAppend(...properties: string[]): void {
  CurrentPlatform.userUniqAppend(...properties);
}
export function getDataTowerId(callback: (id: string) => void): void;
export function getDataTowerId(): Promise<string>;
export function getDataTowerId(callback?: (id: string) => void): void | Promise<string> {
  if (!callback) return Promise.resolve('data tower id');
  callback('data tower id');
}
export function setAccountId(id: string): void {
  CurrentPlatform.setAccountId(id);
}
export function setDistinctId(id: string): void {
  CurrentPlatform.setDistinctId(id);
}
export function getDistinctId(): string | void | null {
  return CurrentPlatform.getDistinctId();
}
export function setFirebaseAppInstanceId(id: string): void {
  CurrentPlatform.setFirebaseAppInstanceId(id);
}
export function setAppsFlyerId(id: string): void {
  CurrentPlatform.setAppsFlyerId(id);
}
export function setKochavaId(id: string): void {
  CurrentPlatform.setKochavaId(id);
}
export function setAdjustId(id: string): void {
  CurrentPlatform.setAdjustId(id);
}
export function setCommonProperties(properties: Record<string, any>): void {
  CurrentPlatform.setCommonProperties(properties);
}
export function clearCommonProperties(): void {
  CurrentPlatform.clearCommonProperties();
}
export function setStaticCommonProperties(properties: Record<string, any>): void {
  CurrentPlatform.setStaticCommonProperties(properties);
}
export function clearStaticCommonProperties(): void {
  CurrentPlatform.clearStaticCommonProperties();
}
