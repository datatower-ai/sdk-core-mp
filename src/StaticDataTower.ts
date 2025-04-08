import type { MultipleInstanceManager } from '@/MultipleInstanceManager';
import type {
  ArrayProperties,
  BaseReportOptions,
  BaseReportPaidOptions,
  CommonReportOptions,
  Config,
  ExcludePrivateKey,
  NativeConfig,
  Properties,
  ReportSuccessOptions,
} from '@/type';
import { Logger } from './Logger';

export class StaticDataTower {
  protected static readonly instances: MultipleInstanceManager<DataTower>;

  private static validateConfig(config: Config) {
    const requiredKeys = <const>['token', 'appId', 'serverUrl'];
    const errorKeys = requiredKeys.filter((key) => !config[key]);
    if (config.isDebug) errorKeys.forEach((e) => Logger.error(`${e} is required`));
    return !errorKeys.length;
  }

  static async initSDK(config: Config): Promise<void> {
    if (!this.validateConfig(config)) return Promise.reject('config error');
    const instance = this.instances.add(config.appId);
    return instance.initSDK(config);
  }
  /**
   * manually start the report (if the manualEnableUpload is true)
   */
  static enableUpload(appId?: string): void {
    return this.instances.get(appId)?.enableUpload();
  }
  static track<T extends Properties & ExcludePrivateKey<T>>(eventName: string, properties: T, appId?: string): void {
    return this.instances.get(appId)?.track(eventName, properties);
  }
  static userSet<T extends Properties & ExcludePrivateKey<T>>(properties: T, appId?: string): void {
    return this.instances.get(appId)?.userSet(properties);
  }
  static userSetOnce<T extends Properties & ExcludePrivateKey<T>>(properties: T, appId?: string): void {
    return this.instances.get(appId)?.userSetOnce(properties);
  }
  static userAdd<T extends Record<string, number> & ExcludePrivateKey<T>>(properties: T, appId?: string): void {
    return this.instances.get(appId)?.userAdd(properties);
  }
  static userUnset(properties: string[], appId?: string): void {
    return this.instances.get(appId)?.userUnset(properties);
  }
  static userDelete(appId?: string): void {
    return this.instances.get(appId)?.userDelete();
  }
  static userAppend<T extends ArrayProperties & ExcludePrivateKey<T>>(properties: T, appId?: string): void {
    return this.instances.get(appId)?.userAppend(properties);
  }
  static userUniqAppend<T extends ArrayProperties & ExcludePrivateKey<T>>(properties: T, appId?: string): void {
    return this.instances.get(appId)?.userUniqAppend(properties);
  }
  static getDataTowerId(callback: (id: string) => void, appId?: string): void;
  static getDataTowerId(appId?: string): Promise<string>;
  static getDataTowerId(callbackOrapp_id?: ((id: string) => void) | string, appId?: string): void | Promise<string> {
    return typeof callbackOrapp_id === 'string'
      ? this.instances.get(callbackOrapp_id)?.getDataTowerId()
      : this.instances.get(appId)?.getDataTowerId(callbackOrapp_id!);
  }
  static setAccountId(id: string, appId?: string): void {
    return this.instances.get(appId)?.setAccountId(id);
  }
  static setStaticCommonProperties<T extends Properties & ExcludePrivateKey<T>>(properties: T, appId?: string): void {
    return this.instances.get(appId)?.setStaticCommonProperties(properties);
  }
  static clearStaticCommonProperties(appId?: string): void {
    return this.instances.get(appId)?.clearStaticCommonProperties();
  }
  static setDynamicCommonProperties<T extends Properties & ExcludePrivateKey<T>>(
    callback: () => T,
    appId?: string,
  ): void {
    return this.instances.get(appId)?.setDynamicCommonProperties(callback);
  }
  static clearDynamicCommonProperties(appId?: string): void {
    return this.instances.get(appId)?.clearDynamicCommonProperties();
  }
}

export class StaticAnalysisDataTower extends StaticDataTower {
  protected static readonly instances: MultipleInstanceManager<AnalysisDataTower>;

  // static initSDK(config: NativeConfig): Promise<void> {
  //   console.log('===other init');
  //   return this.instances.get(config);
  // }

  // id
  static setFirebaseAppInstanceId(id: string, appId?: string): void {
    return this.instances.get(appId)?.setFirebaseAppInstanceId(id);
  }
  static setAppsFlyerId(id: string, appId?: string): void {
    return this.instances.get(appId)?.setAppsFlyerId(id);
  }
  static setKochavaId(id: string, appId?: string): void {
    return this.instances.get(appId)?.setKochavaId(id);
  }
  static setAdjustId(id: string, appId?: string): void {
    return this.instances.get(appId)?.setAdjustId(id);
  }

  // Timer
  static trackTimerStart(eventName: string, appId?: string): void {
    return this.instances.get(appId)?.trackTimerStart(eventName);
  }
  static trackTimerPause(eventName: string, appId?: string): void {
    return this.instances.get(appId)?.trackTimerPause(eventName);
  }
  static trackTimerResume(eventName: string, appId?: string): void {
    return this.instances.get(appId)?.trackTimerResume(eventName);
  }
  static trackTimerEnd<T extends Properties & ExcludePrivateKey<T>>(
    eventName: string,
    properties: T,
    appId?: string,
  ): void {
    return this.instances.get(appId)?.trackTimerEnd(eventName, properties);
  }

  // Ad
  static reportLoadBegin(opts: BaseReportOptions, appId?: string): void {
    return this.instances.get(appId)?.reportLoadBegin(opts);
  }
  static reportLoadEnd(
    opts: BaseReportOptions & { duration: number; result: boolean; errorCode: number; errorMessage: string },
    appId?: string,
  ): void {
    return this.instances.get(appId)?.reportLoadEnd(opts);
  }
  static reportToShow(opts: BaseReportOptions & CommonReportOptions, appId?: string): void {
    return this.instances.get(appId)?.reportToShow(opts);
  }
  static reportShow(opts: BaseReportOptions & CommonReportOptions, appId?: string): void {
    return this.instances.get(appId)?.reportShow(opts);
  }
  static reportShowFailed(
    opts: BaseReportOptions & CommonReportOptions & { errorCode: number; errorMessage: string },
    appId?: string,
  ): void {
    return this.instances.get(appId)?.reportShowFailed(opts);
  }
  static reportClose(opts: BaseReportOptions & CommonReportOptions, appId?: string): void {
    return this.instances.get(appId)?.reportClose(opts);
  }
  static reportClick(opts: BaseReportOptions & CommonReportOptions, appId?: string): void {
    return this.instances.get(appId)?.reportClick(opts);
  }
  static reportRewarded(opts: BaseReportOptions & CommonReportOptions, appId?: string): void {
    return this.instances.get(appId)?.reportRewarded(opts);
  }
  static reportConversionByClick(opts: BaseReportOptions & CommonReportOptions, appId?: string): void {
    return this.instances.get(appId)?.reportConversionByClick(opts);
  }
  static reportConversionByLeftApp(opts: BaseReportOptions & CommonReportOptions, appId?: string): void {
    return this.instances.get(appId)?.reportConversionByLeftApp(opts);
  }
  static reportConversionByRewarded(opts: BaseReportOptions & CommonReportOptions, appId?: string): void {
    return this.instances.get(appId)?.reportConversionByRewarded(opts);
  }
  static reportPaid(opts: BaseReportPaidOptions & { country: string }, appId?: string): void;
  static reportPaid(opts: BaseReportPaidOptions & { currency: string; entrance: string }, appId?: string): void;
  static reportPaid(
    opts: BaseReportPaidOptions & ({ country: string } & { currency: string; entrance: string }),
    appId?: string,
  ): void {
    return this.instances.get(appId)?.reportPaid(opts);
  }

  // IAP
  static reportPurchaseSuccess(opts: ReportSuccessOptions & { order: string }, appId?: string): void {
    return this.instances.get(appId)?.reportPurchaseSuccess(opts);
  }

  // IAS
  static reportSubscribeSuccess(
    opts: ReportSuccessOptions & { originalOrderId: string; orderId: string },
    appId?: string,
  ): void {
    return this.instances.get(appId)?.reportSubscribeSuccess(opts);
  }
}

export type AnalysisDataTower = Omit<typeof StaticAnalysisDataTower, 'prototype'>;

export type DataTower = Omit<typeof StaticDataTower, 'prototype'>;
