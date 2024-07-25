import type {
  ArrayProperties,
  BaseReportOptions,
  BaseReportPaidOptions,
  CommonReportOptions,
  Config,
  Properties,
  PublicKey,
  ReportSuccessOptions,
} from '@/type';
import { Logger } from './sandbox';

export class StaticDataTower {
  protected static instances: Record<string, DataTower> = {};
  protected static createInstance(): DataTower {
    return StaticDataTower;
  }
  protected static getInstance(app_id: string = 'default'): DataTower {
    return (
      this.instances[app_id] || Logger.error('DataTower', `instance '${app_id}' not found, please initialize SDK first`)
    );
  }

  static async initSDK(config: Config): Promise<void> {
    const instance = this.createInstance();
    if (!this.instances.default) {
      this.instances.default = instance;
    } else if (!this.instances[config.app_id]) {
      this.instances[config.app_id] = instance;
    } else {
      Logger.warn('DataTower', `instance '${config.app_id}' already exists, will be replaced`);
      return;
    }
    return instance.initSDK(config);
  }
  /**
   * manually start the report (if the manualEnableUpload is true)
   */
  static enableUpload(app_id?: string): void {
    return this.getInstance(app_id)?.enableUpload();
  }
  static track<K extends string>(eventName: string, properties: Properties<K>, app_id?: string): void {
    return this.getInstance(app_id)?.track(eventName, properties);
  }
  static userSet<K extends string>(properties: Properties<K>, app_id?: string): void {
    return this.getInstance(app_id)?.userSet(properties);
  }
  static userSetOnce<K extends string>(properties: Properties<K>, app_id?: string): void {
    return this.getInstance(app_id)?.userSetOnce(properties);
  }
  static userAdd<K extends string>(properties: Record<PublicKey<K>, number>, app_id?: string): void {
    return this.getInstance(app_id)?.userAdd(properties);
  }
  static userUnset(properties: string[], app_id?: string): void {
    return this.getInstance(app_id)?.userUnset(properties);
  }
  static userDelete(app_id?: string): void {
    return this.getInstance(app_id)?.userDelete();
  }
  static userAppend<K extends string>(properties: ArrayProperties<K>, app_id?: string): void {
    return this.getInstance(app_id)?.userAppend(properties);
  }
  static userUniqAppend<K extends string>(properties: ArrayProperties<K>, app_id?: string): void {
    return this.getInstance(app_id)?.userUniqAppend(properties);
  }
  static getDataTowerId(callback: (id: string) => void, app_id?: string): void;
  static getDataTowerId(app_id?: string): Promise<string>;
  static getDataTowerId(callbackOrapp_id?: ((id: string) => void) | string, app_id?: string): void | Promise<string> {
    return typeof callbackOrapp_id === 'string'
      ? this.getInstance(callbackOrapp_id)?.getDataTowerId()
      : this.getInstance(app_id)?.getDataTowerId(callbackOrapp_id!);
  }
  static setAccountId(id: string, app_id?: string): void {
    return this.getInstance(app_id)?.setAccountId(id);
  }
  static setStaticCommonProperties<K extends string>(properties: Properties<K>, app_id?: string): void {
    return this.getInstance(app_id)?.setStaticCommonProperties(properties);
  }
  static clearStaticCommonProperties(app_id?: string): void {
    return this.getInstance(app_id)?.clearStaticCommonProperties();
  }
  static setCommonProperties(callback: <K extends string>() => Properties<K>, app_id?: string): void {
    return this.getInstance(app_id)?.setCommonProperties(callback);
  }
  static clearCommonProperties(app_id?: string): void {
    return this.getInstance(app_id)?.clearCommonProperties();
  }
}

export class AnalysisStaticDataTower extends StaticDataTower {
  protected static instances: Record<string, AnalysisDataTower> = {};
  protected static createInstance(): AnalysisDataTower {
    return AnalysisStaticDataTower;
  }
  protected static getInstance(app_id: string = 'default'): AnalysisDataTower {
    return this.getInstance(app_id);
  }

  // id
  static setFirebaseAppInstanceId(id: string, app_id?: string): void {
    return this.getInstance(app_id)?.setFirebaseAppInstanceId(id);
  }
  static setAppsFlyerId(id: string, app_id?: string): void {
    return this.getInstance(app_id)?.setAppsFlyerId(id);
  }
  static setKochavaId(id: string, app_id?: string): void {
    return this.getInstance(app_id)?.setKochavaId(id);
  }
  static setAdjustId(id: string, app_id?: string): void {
    return this.getInstance(app_id)?.setAdjustId(id);
  }

  // Timer
  static trackTimerStart(eventName: string, app_id?: string): void {
    return this.getInstance(app_id)?.trackTimerStart(eventName);
  }
  static trackTimerPause(eventName: string, app_id?: string): void {
    return this.getInstance(app_id)?.trackTimerPause(eventName);
  }
  static trackTimerResume(eventName: string, app_id?: string): void {
    return this.getInstance(app_id)?.trackTimerResume(eventName);
  }
  static trackTimerEnd<K extends string>(eventName: string, properties: Properties<K>, app_id?: string): void {
    return this.getInstance(app_id)?.trackTimerEnd(eventName, properties);
  }

  // Ad
  static reportLoadBegin<K extends string>(opts: BaseReportOptions<K>, app_id?: string): void {
    return this.getInstance(app_id)?.reportLoadBegin(opts);
  }
  static reportLoadEnd<K extends string>(
    opts: BaseReportOptions<K> & { duration: number; result: boolean; errorCode: number; errorMessage: string },
    app_id?: string,
  ): void {
    return this.getInstance(app_id)?.reportLoadEnd(opts);
  }
  static reportToShow<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions, app_id?: string): void {
    return this.getInstance(app_id)?.reportToShow(opts);
  }
  static reportShow<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions, app_id?: string): void {
    return this.getInstance(app_id)?.reportShow(opts);
  }
  static reportShowFailed<K extends string>(
    opts: BaseReportOptions<K> & CommonReportOptions & { errorCode: number; errorMessage: string },
    app_id?: string,
  ): void {
    return this.getInstance(app_id)?.reportShowFailed(opts);
  }
  static reportClose<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions, app_id?: string): void {
    return this.getInstance(app_id)?.reportClose(opts);
  }
  static reportClick<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions, app_id?: string): void {
    return this.getInstance(app_id)?.reportClick(opts);
  }
  static reportRewarded<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions, app_id?: string): void {
    return this.getInstance(app_id)?.reportRewarded(opts);
  }
  static reportConversionByClick<K extends string>(
    opts: BaseReportOptions<K> & CommonReportOptions,
    app_id?: string,
  ): void {
    return this.getInstance(app_id)?.reportConversionByClick(opts);
  }
  static reportConversionByLeftApp<K extends string>(
    opts: BaseReportOptions<K> & CommonReportOptions,
    app_id?: string,
  ): void {
    return this.getInstance(app_id)?.reportConversionByLeftApp(opts);
  }
  static reportConversionByRewarded<K extends string>(
    opts: BaseReportOptions<K> & CommonReportOptions,
    app_id?: string,
  ): void {
    return this.getInstance(app_id)?.reportConversionByRewarded(opts);
  }
  static reportPaid<K extends string>(opts: BaseReportPaidOptions<K> & { country: string }, app_id?: string): void;
  static reportPaid<K extends string>(
    opts: BaseReportPaidOptions<K> & { currency: string; entrance: string },
    app_id?: string,
  ): void;
  static reportPaid<K extends string>(
    opts: BaseReportPaidOptions<K> & ({ country: string } & { currency: string; entrance: string }),
    app_id?: string,
  ): void {
    return this.getInstance(app_id)?.reportPaid(opts);
  }

  // IAP
  static reportPurchaseSuccess<K extends string>(
    opts: ReportSuccessOptions<K> & { order: string },
    app_id?: string,
  ): void {
    return this.getInstance(app_id)?.reportPurchaseSuccess(opts);
  }

  // IAS
  static reportSubscribeSuccess<K extends string>(
    opts: ReportSuccessOptions<K> & { originalOrderId: string; orderId: string },
    app_id?: string,
  ): void {
    return this.getInstance(app_id)?.reportSubscribeSuccess(opts);
  }
}

export type AnalysisDataTower = Omit<typeof AnalysisStaticDataTower, 'prototype'>;

export type DataTower = Omit<typeof StaticDataTower, 'prototype'>;
