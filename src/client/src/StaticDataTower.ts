import type { Config, PublicKey } from '@/src/type';
import { Logger } from './sandbox';

export class StaticDataTower {
  protected static instances: Record<string, DataTower> = {};
  protected static createInstance(): DataTower {
    throw new Error('not implemented');
  }

  private static getInstance(appId: string = '__default__'): DataTower {
    return this.instances[appId] || Logger.error('DataTower', `instance ${appId} not found, please init first`);
  }

  static async init(config: Config): Promise<void> {
    const instance = this.createInstance();
    if (!this.instances.__default__) {
      this.instances.__default__ = instance;
    } else {
      this.instances[config.appId] = instance;
    }
    return instance.init(config);
  }
  /**
   * manually start the report (if the manualEnableUpload is true)
   */
  static enableUpload(appId?: string): void {
    return this.getInstance(appId)?.enableUpload();
  }
  static track(eventName: string, properties: Record<string, string | boolean | number>, appId?: string): void {
    return this.getInstance(appId)?.track(eventName, properties);
  }
  static userSet<K extends string>(properties: Record<PublicKey<K>, string | boolean | number>, appId?: string): void {
    return this.getInstance(appId)?.userSet(properties);
  }
  static userSetOnce<K extends string>(
    properties: Record<PublicKey<K>, string | boolean | number>,
    appId?: string,
  ): void {
    return this.getInstance(appId)?.userSetOnce(properties);
  }
  static userAdd<K extends string>(properties: Record<PublicKey<K>, number>, appId?: string): void {
    return this.getInstance(appId)?.userAdd(properties);
  }
  static userUnset(properties: string[], appId?: string): void {
    return this.getInstance(appId)?.userUnset(properties);
  }
  static userDelete(appId?: string): void {
    return this.getInstance(appId)?.userDelete();
  }
  static userAppend<K extends string>(properties: Record<PublicKey<K>, any[]>, appId?: string): void {
    return this.getInstance(appId)?.userAppend(properties);
  }
  static userUniqAppend<K extends string>(properties: Record<PublicKey<K>, any[]>, appId?: string): void {
    return this.getInstance(appId)?.userUniqAppend(properties);
  }
  static getDataTowerId(callback: (id: string) => void, appId?: string): void;
  static getDataTowerId(appId?: string): Promise<string>;
  static getDataTowerId(callbackOrAppId?: ((id: string) => void) | string, appId?: string): void | Promise<string> {
    return typeof callbackOrAppId === 'string'
      ? this.getInstance(callbackOrAppId)?.getDataTowerId()
      : this.getInstance(appId)?.getDataTowerId(callbackOrAppId!);
  }
  static getDistinctId(callback: (id: string) => void, appId?: string): void;
  static getDistinctId(appId?: string): Promise<string>;
  static getDistinctId(callbackOrAppId?: ((id: string) => void) | string, appId?: string): void | Promise<string> {
    return typeof callbackOrAppId === 'string'
      ? this.getInstance(callbackOrAppId)?.getDistinctId()
      : this.getInstance(appId)?.getDistinctId(callbackOrAppId!);
  }
  static setAccountId(id: string, appId?: string): void {
    return this.getInstance(appId)?.setAccountId(id);
  }
  static setDistinctId(id: string, appId?: string): void {
    return this.getInstance(appId)?.setDistinctId(id);
  }
  static setFirebaseAppInstanceId(id: string, appId?: string): void {
    return this.getInstance(appId)?.setFirebaseAppInstanceId(id);
  }
  static setAppsFlyerId(id: string, appId?: string): void {
    return this.getInstance(appId)?.setAppsFlyerId(id);
  }
  static setKochavaId(id: string, appId?: string): void {
    return this.getInstance(appId)?.setKochavaId(id);
  }
  static setAdjustId(id: string, appId?: string): void {
    return this.getInstance(appId)?.setAdjustId(id);
  }
  static setStaticCommonProperties<K extends string>(
    properties: Record<PublicKey<K>, string | boolean | number>,
    appId?: string,
  ): void {
    return this.getInstance(appId)?.setStaticCommonProperties(properties);
  }
  static clearStaticCommonProperties(appId?: string): void {
    return this.getInstance(appId)?.clearStaticCommonProperties();
  }
  static setCommonProperties(callback: () => Record<string, string | boolean | number>, appId?: string): void {
    return this.getInstance(appId)?.setCommonProperties(callback);
  }
  static clearCommonProperties(appId?: string): void {
    return this.getInstance(appId)?.clearCommonProperties();
  }
}

export type DataTower = Omit<typeof StaticDataTower, 'prototype'>;
