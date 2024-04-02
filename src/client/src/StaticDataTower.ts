import type { Config, PublicKey } from '@/src/type';

// TODO: multiple instance support
export class StaticDataTower {
  protected static instance: DataTower;

  static async init(config: Config): Promise<void> {
    return this.instance.init(config);
  }
  /**
   * manually start the report (if the manualEnableUpload is true)
   */
  static enableUpload(): void {
    return this.instance.enableUpload();
  }
  static track(eventName: string, properties: Record<string, string | boolean | number>): void {
    return this.instance.track(eventName, properties);
  }
  static userSet<K extends string>(properties: Record<PublicKey<K>, string | boolean | number>): void {
    return this.instance.userSet(properties);
  }
  static userSetOnce<K extends string>(properties: Record<PublicKey<K>, string | boolean | number>): void {
    return this.instance.userSetOnce(properties);
  }
  static userAdd<K extends string>(properties: Record<PublicKey<K>, number>): void {
    return this.instance.userAdd(properties);
  }
  static userUnset(properties: string[]): void {
    return this.instance.userUnset(properties);
  }
  static userDelete(): void {
    return this.instance.userDelete();
  }
  static userAppend<K extends string>(properties: Record<PublicKey<K>, any[]>): void {
    return this.instance.userAppend(properties);
  }
  static userUniqAppend<K extends string>(properties: Record<PublicKey<K>, any[]>): void {
    return this.instance.userUniqAppend(properties);
  }
  static getDataTowerId(callback: (id: string) => void): void;
  static getDataTowerId(): Promise<string>;
  static getDataTowerId(callback?: (id: string) => void): void | Promise<string> {
    return this.instance.getDataTowerId(callback!);
  }
  static getDistinctId(callback: (id: string) => void): void;
  static getDistinctId(): Promise<string>;
  static getDistinctId(callback?: (id: string) => void): void | Promise<string> {
    return this.instance.getDistinctId(callback!);
  }
  static setAccountId(id: string): void {
    return this.instance.setAccountId(id);
  }
  static setDistinctId(id: string): void {
    return this.instance.setDistinctId(id);
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
  static setStaticCommonProperties<K extends string>(
    properties: Record<PublicKey<K>, string | boolean | number>,
  ): void {
    return this.instance.setStaticCommonProperties(properties);
  }
  static clearStaticCommonProperties(): void {
    return this.instance.clearStaticCommonProperties();
  }
  static setCommonProperties(callback: () => Record<string, string | boolean | number>): void {
    return this.instance.setCommonProperties(callback);
  }
  static clearCommonProperties(): void {
    return this.instance.clearCommonProperties();
  }
}

export type DataTower = Omit<typeof StaticDataTower, 'prototype'>;
