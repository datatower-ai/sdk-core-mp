import type {
  BaseReportOptions,
  BaseReportPaidOptions,
  CommonReportOptions,
  Config,
  Properties,
  PublicKey,
  ReportSuccessOptions,
} from '@/src/type';
import { Logger } from './sandbox';

export class StaticDataTower {
  protected static instances: Record<string, DataTower> = {};
  protected static createInstance(): DataTower {
    throw new Error('not implemented');
  }

  private static getInstance(appId: string = '__default__'): DataTower {
    return this.instances[appId] || Logger.error('DataTower', `instance ${appId} not found, please initSDK first`);
  }

  static async initSDK(config: Config): Promise<void> {
    const instance = this.createInstance();
    if (!this.instances.__default__) {
      this.instances.__default__ = instance;
    } else {
      this.instances[config.appId] = instance;
    }
    return instance.initSDK(config);
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
  static userSet<K extends string>(properties: Properties<K>, appId?: string): void {
    return this.getInstance(appId)?.userSet(properties);
  }
  static userSetOnce<K extends string>(properties: Properties<K>, appId?: string): void {
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
  static setAccountId(id: string, appId?: string): void {
    return this.getInstance(appId)?.setAccountId(id);
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
  static setStaticCommonProperties<K extends string>(properties: Properties<K>, appId?: string): void {
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
  // Timer
  static trackTimerStart(eventName: string, appId?: string): void {
    return this.getInstance(appId)?.trackTimerStart(eventName);
  }
  static trackTimerPause(eventName: string, appId?: string): void {
    return this.getInstance(appId)?.trackTimerPause(eventName);
  }
  static trackTimerResume(eventName: string, appId?: string): void {
    return this.getInstance(appId)?.trackTimerResume(eventName);
  }
  static trackTimerEnd<K extends string>(eventName: string, properties: Properties<K>, appId?: string): void {
    return this.getInstance(appId)?.trackTimerEnd(eventName, properties);
  }

  // Ad
  static reportLoadBegin<K extends string>(options: BaseReportOptions<K> & CommonReportOptions, appId?: string): void {
    return this.getInstance(appId)?.reportLoadBegin(options);
  }
  static reportLoadEnd<K extends string>(
    options: BaseReportOptions<K> &
      CommonReportOptions & { duration: number; result: boolean; errorCode: number; errorMessage: string },
    appId?: string,
  ): void {
    return this.getInstance(appId)?.reportLoadEnd(options);
  }
  static reportToShow<K extends string>(options: BaseReportOptions<K> & CommonReportOptions, appId?: string): void {
    return this.getInstance(appId)?.reportToShow(options);
  }
  static reportShow<K extends string>(options: BaseReportOptions<K> & CommonReportOptions, appId?: string): void {
    return this.getInstance(appId)?.reportShow(options);
  }
  static reportShowFailed<K extends string>(
    options: BaseReportOptions<K> & CommonReportOptions & { errorCode: number; errorMessage: string },
    appId?: string,
  ): void {
    return this.getInstance(appId)?.reportShowFailed(options);
  }
  static reportClose<K extends string>(options: BaseReportOptions<K> & CommonReportOptions, appId?: string): void {
    return this.getInstance(appId)?.reportClose(options);
  }
  static reportClick<K extends string>(options: BaseReportOptions<K> & CommonReportOptions, appId?: string): void {
    return this.getInstance(appId)?.reportClick(options);
  }
  static reportRewarded<K extends string>(options: BaseReportOptions<K> & CommonReportOptions, appId?: string): void {
    return this.getInstance(appId)?.reportRewarded(options);
  }
  static reportConversionByClick<K extends string>(
    options: BaseReportOptions<K> & CommonReportOptions,
    appId?: string,
  ): void {
    return this.getInstance(appId)?.reportConversionByClick(options);
  }
  static reportConversionByLeftApp<K extends string>(
    options: BaseReportOptions<K> & CommonReportOptions,
    appId?: string,
  ): void {
    return this.getInstance(appId)?.reportConversionByLeftApp(options);
  }
  static reportConversionByRewarded<K extends string>(
    options: BaseReportOptions<K> & CommonReportOptions,
    appId?: string,
  ): void {
    return this.getInstance(appId)?.reportConversionByRewarded(options);
  }
  static reportPaid<K extends string>(options: BaseReportPaidOptions<K> & { country: string }, appId?: string): void;
  static reportPaid<K extends string>(
    options: BaseReportPaidOptions<K> & { currency: string; entrance: string },
    appId?: string,
  ): void;
  static reportPaid<K extends string>(
    options: BaseReportPaidOptions<K> & ({ country: string } & { currency: string; entrance: string }),
    appId?: string,
  ): void {
    return this.getInstance(appId)?.reportPaid(options);
  }
  static reportLeftApp<K extends string>(options: BaseReportOptions<K> & CommonReportOptions, appId?: string): void {
    return this.getInstance(appId)?.reportLeftApp(options);
  }

  // IAP
  static reportPurchaseSuccess<K extends string>(
    options: ReportSuccessOptions<K> & { order: string },
    appId?: string,
  ): void {
    return this.getInstance(appId)?.reportPurchaseSuccess(options);
  }

  // IAS
  static reportSubscribeSuccess<K extends string>(
    options: ReportSuccessOptions<K> & { originalOrderId: string; orderId: string },
    appId?: string,
  ): void {
    return this.getInstance(appId)?.reportSubscribeSuccess(options);
  }
}

export type DataTower = Omit<typeof StaticDataTower, 'prototype'>;
