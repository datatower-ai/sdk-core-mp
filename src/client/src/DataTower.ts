import type { Config } from './type';

export class DataTower {
  static instance: Omit<typeof DataTower, 'instance' | 'prototype'>;

  static init(config: Config): void {
    return DataTower.instance.init(config);
  }
  static enableTrack(): void {
    return DataTower.instance.enableTrack();
  }
  static track(eventName: string, properties?: Record<string, any>): void {
    return DataTower.instance.track(eventName, properties);
  }
  static userSet(properties: Record<string, any>): void {
    return DataTower.instance.userSet(properties);
  }
  static userSetOnce(properties: Record<string, any>): void {
    return DataTower.instance.userSetOnce(properties);
  }
  static userAdd(properties: Record<string, any>): void {
    return DataTower.instance.userAdd(properties);
  }
  static userUnset(...properties: string[]): void {
    return DataTower.instance.userUnset(...properties);
  }
  static userDel(): void {
    return DataTower.instance.userDel();
  }
  static userAppend(...properties: string[]): void {
    return DataTower.instance.userAppend(...properties);
  }
  static userUniqAppend(...properties: string[]): void {
    return DataTower.instance.userUniqAppend(...properties);
  }
  static getDataTowerId(callback: (id: string) => void): void;
  static getDataTowerId(): Promise<string>;
  static getDataTowerId(callback?: (id: string) => void): void | Promise<string> {
    return DataTower.instance.getDataTowerId(callback!);
  }
  static setAccountId(id: string): void {
    return DataTower.instance.setAccountId(id);
  }
  static setDistinctId(id: string): void {
    return DataTower.instance.setDistinctId(id);
  }
  static getDistinctId(): string | null | void {
    return DataTower.instance.getDistinctId();
  }
  static setFirebaseAppInstanceId(id: string): void {
    return DataTower.instance.setFirebaseAppInstanceId(id);
  }
  static setAppsFlyerId(id: string): void {
    return DataTower.instance.setAppsFlyerId(id);
  }
  static setKochavaId(id: string): void {
    return DataTower.instance.setKochavaId(id);
  }
  static setAdjustId(id: string): void {
    return DataTower.instance.setAdjustId(id);
  }
  static setCommonProperties(properties: Record<string, any>): void {
    return DataTower.instance.setCommonProperties(properties);
  }
  static clearCommonProperties(): void {
    return DataTower.instance.clearCommonProperties();
  }
  static setStaticCommonProperties(properties: Record<string, any>): void {
    return DataTower.instance.setStaticCommonProperties(properties);
  }
  static clearStaticCommonProperties(): void {
    return DataTower.instance.clearStaticCommonProperties();
  }
}
