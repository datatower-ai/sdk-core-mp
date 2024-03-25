import type { Config } from './type';

export class DataTower {
  static instance: Omit<typeof DataTower, 'instance' | 'prototype'>;

  static init(config: Config): void {
    return this.instance.init(config);
  }
  static enableTrack(): void {
    return this.instance.enableTrack();
  }
  static track(eventName: string, properties?: Record<string, any>): void {
    return this.instance.track(eventName, properties);
  }
  static userSet(properties: Record<string, any>): void {
    return this.instance.userSet(properties);
  }
  static userSetOnce(properties: Record<string, any>): void {
    return this.instance.userSetOnce(properties);
  }
  static userAdd(properties: Record<string, any>): void {
    return this.instance.userAdd(properties);
  }
  static userUnset(...properties: string[]): void {
    return this.instance.userUnset(...properties);
  }
  static userDel(): void {
    return this.instance.userDel();
  }
  static userAppend(...properties: string[]): void {
    return this.instance.userAppend(...properties);
  }
  static userUniqAppend(...properties: string[]): void {
    return this.instance.userUniqAppend(...properties);
  }
  static getDataTowerId(callback: (id: string) => void): void;
  static getDataTowerId(): Promise<string>;
  static getDataTowerId(callback?: (id: string) => void): void | Promise<string> {
    return this.instance.getDataTowerId(callback!);
  }
  static setAccountId(id: string): void {
    return this.instance.setAccountId(id);
  }
  static setDistinctId(id: string): void {
    return this.instance.setDistinctId(id);
  }
  static getDistinctId(): string | null | void {
    return this.instance.getDistinctId();
  }
  static setFirebaseAppInstanceId(id: string): void {
    return this.instance.setFirebaseAppInstanceId(id);
  }
  static setAppsFlyerId(id: string): void {
    return this.instance.setAppsFlyerId(id);
  }
  static setKochavaId(id: string): void {
    return this.instance.setKochavaId(id);
  }
  static setAdjustId(id: string): void {
    return this.instance.setAdjustId(id);
  }
  static setCommonProperties(properties: Record<string, any>): void {
    return this.instance.setCommonProperties(properties);
  }
  static clearCommonProperties(): void {
    return this.instance.clearCommonProperties();
  }
  static setStaticCommonProperties(properties: Record<string, any>): void {
    return this.instance.setStaticCommonProperties(properties);
  }
  static clearStaticCommonProperties(): void {
    return this.instance.clearStaticCommonProperties();
  }
}

export type DT = typeof DataTower & {
  new (): Omit<typeof DataTower, 'instance' | 'prototype'>;
};
