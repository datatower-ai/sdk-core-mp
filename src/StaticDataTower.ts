import type { MultipleInstanceManager } from '@/MultipleInstanceManager';
import type {
  ArrayProperties,
  BaseReportOptions,
  BaseReportPaidOptions,
  CommonReportOptions,
  Config,
  ExcludePrivateKey,
  Properties,
  ReportSuccessOptions,
} from '@/type';
import { Logger } from './Logger';

export class StaticDataTower {
  protected static readonly instances: MultipleInstanceManager<DataTower>;

  private static validateConfig(config: Config) {
    const requiredKeys = <const>['token', 'app_id', 'server_url'];
    const errorKeys = requiredKeys.filter((key) => !config[key]);
    if (config.isDebug) errorKeys.forEach((e) => Logger.error(`${e} is required`));
    return !errorKeys.length;
  }

  static async initSDK(config: Config): Promise<void> {
    if (!this.validateConfig(config)) return Promise.reject('config error');
    const instance = this.instances.add(config.app_id);
    return instance.initSDK(config);
  }
  /**
   * manually start the report (if the manualEnableUpload is true)
   */
  static enableUpload(app_id?: string): void {
    return this.instances.get(app_id)?.enableUpload();
  }
  static track<T extends Properties & ExcludePrivateKey<T>>(eventName: string, properties: T, app_id?: string): void {
    return this.instances.get(app_id)?.track(eventName, properties);
  }
  static userSet<T extends Properties & ExcludePrivateKey<T>>(properties: T, app_id?: string): void {
    return this.instances.get(app_id)?.userSet(properties);
  }
  static userSetOnce<T extends Properties & ExcludePrivateKey<T>>(properties: T, app_id?: string): void {
    return this.instances.get(app_id)?.userSetOnce(properties);
  }
  static userAdd<T extends Record<string, number> & ExcludePrivateKey<T>>(properties: T, app_id?: string): void {
    return this.instances.get(app_id)?.userAdd(properties);
  }
  static userUnset(properties: string[], app_id?: string): void {
    return this.instances.get(app_id)?.userUnset(properties);
  }
  static userDelete(app_id?: string): void {
    return this.instances.get(app_id)?.userDelete();
  }
  static userAppend<T extends ArrayProperties & ExcludePrivateKey<T>>(properties: T, app_id?: string): void {
    return this.instances.get(app_id)?.userAppend(properties);
  }
  static userUniqAppend<T extends ArrayProperties & ExcludePrivateKey<T>>(properties: T, app_id?: string): void {
    return this.instances.get(app_id)?.userUniqAppend(properties);
  }
  static getDataTowerId(callback: (id: string) => void, app_id?: string): void;
  static getDataTowerId(app_id?: string): Promise<string>;
  static getDataTowerId(callbackOrapp_id?: ((id: string) => void) | string, app_id?: string): void | Promise<string> {
    return typeof callbackOrapp_id === 'string'
      ? this.instances.get(callbackOrapp_id)?.getDataTowerId()
      : this.instances.get(app_id)?.getDataTowerId(callbackOrapp_id!);
  }
  static setAccountId(id: string, app_id?: string): void {
    return this.instances.get(app_id)?.setAccountId(id);
  }
  static setStaticCommonProperties<T extends Properties & ExcludePrivateKey<T>>(properties: T, app_id?: string): void {
    return this.instances.get(app_id)?.setStaticCommonProperties(properties);
  }
  static clearStaticCommonProperties(app_id?: string): void {
    return this.instances.get(app_id)?.clearStaticCommonProperties();
  }
  static setDynamicCommonProperties<T extends Properties & ExcludePrivateKey<T>>(
    callback: () => T,
    app_id?: string,
  ): void {
    return this.instances.get(app_id)?.setDynamicCommonProperties(callback);
  }
  static clearDynamicCommonProperties(app_id?: string): void {
    return this.instances.get(app_id)?.clearDynamicCommonProperties();
  }
}

export class StaticAnalysisDataTower extends StaticDataTower {
  protected static readonly instances: MultipleInstanceManager<AnalysisDataTower>;

  // id
  static setFirebaseAppInstanceId(id: string, app_id?: string): void {
    return this.instances.get(app_id)?.setFirebaseAppInstanceId(id);
  }
  static setAppsFlyerId(id: string, app_id?: string): void {
    return this.instances.get(app_id)?.setAppsFlyerId(id);
  }
  static setKochavaId(id: string, app_id?: string): void {
    return this.instances.get(app_id)?.setKochavaId(id);
  }
  static setAdjustId(id: string, app_id?: string): void {
    return this.instances.get(app_id)?.setAdjustId(id);
  }

  // Timer
  static trackTimerStart(eventName: string, app_id?: string): void {
    return this.instances.get(app_id)?.trackTimerStart(eventName);
  }
  static trackTimerPause(eventName: string, app_id?: string): void {
    return this.instances.get(app_id)?.trackTimerPause(eventName);
  }
  static trackTimerResume(eventName: string, app_id?: string): void {
    return this.instances.get(app_id)?.trackTimerResume(eventName);
  }
  static trackTimerEnd<T extends Properties & ExcludePrivateKey<T>>(
    eventName: string,
    properties: T,
    app_id?: string,
  ): void {
    return this.instances.get(app_id)?.trackTimerEnd(eventName, properties);
  }

  // Ad
  static reportLoadBegin(opts: BaseReportOptions, app_id?: string): void {
    return this.instances.get(app_id)?.reportLoadBegin(opts);
  }
  static reportLoadEnd(
    opts: BaseReportOptions & { duration: number; result: boolean; errorCode: number; errorMessage: string },
    app_id?: string,
  ): void {
    return this.instances.get(app_id)?.reportLoadEnd(opts);
  }
  static reportToShow(opts: BaseReportOptions & CommonReportOptions, app_id?: string): void {
    return this.instances.get(app_id)?.reportToShow(opts);
  }
  static reportShow(opts: BaseReportOptions & CommonReportOptions, app_id?: string): void {
    return this.instances.get(app_id)?.reportShow(opts);
  }
  static reportShowFailed(
    opts: BaseReportOptions & CommonReportOptions & { errorCode: number; errorMessage: string },
    app_id?: string,
  ): void {
    return this.instances.get(app_id)?.reportShowFailed(opts);
  }
  static reportClose(opts: BaseReportOptions & CommonReportOptions, app_id?: string): void {
    return this.instances.get(app_id)?.reportClose(opts);
  }
  static reportClick(opts: BaseReportOptions & CommonReportOptions, app_id?: string): void {
    return this.instances.get(app_id)?.reportClick(opts);
  }
  static reportRewarded(opts: BaseReportOptions & CommonReportOptions, app_id?: string): void {
    return this.instances.get(app_id)?.reportRewarded(opts);
  }
  static reportConversionByClick(opts: BaseReportOptions & CommonReportOptions, app_id?: string): void {
    return this.instances.get(app_id)?.reportConversionByClick(opts);
  }
  static reportConversionByLeftApp(opts: BaseReportOptions & CommonReportOptions, app_id?: string): void {
    return this.instances.get(app_id)?.reportConversionByLeftApp(opts);
  }
  static reportConversionByRewarded(opts: BaseReportOptions & CommonReportOptions, app_id?: string): void {
    return this.instances.get(app_id)?.reportConversionByRewarded(opts);
  }
  static reportPaid(opts: BaseReportPaidOptions & { country: string }, app_id?: string): void;
  static reportPaid(opts: BaseReportPaidOptions & { currency: string; entrance: string }, app_id?: string): void;
  static reportPaid(
    opts: BaseReportPaidOptions & ({ country: string } & { currency: string; entrance: string }),
    app_id?: string,
  ): void {
    return this.instances.get(app_id)?.reportPaid(opts);
  }

  // IAP
  static reportPurchaseSuccess(opts: ReportSuccessOptions & { order: string }, app_id?: string): void {
    return this.instances.get(app_id)?.reportPurchaseSuccess(opts);
  }

  // IAS
  static reportSubscribeSuccess(
    opts: ReportSuccessOptions & { originalOrderId: string; orderId: string },
    app_id?: string,
  ): void {
    return this.instances.get(app_id)?.reportSubscribeSuccess(opts);
  }
}

export type AnalysisDataTower = Omit<typeof StaticAnalysisDataTower, 'prototype'>;

export type DataTower = Omit<typeof StaticDataTower, 'prototype'>;
