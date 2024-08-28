import { AnalysisDataTower } from '@/StaticDataTower';
import { DEFAULT_INITIAL_CONFIG } from '@/constant';
import type {
  ArrayProperties,
  BaseReportOptions,
  BaseReportPaidOptions,
  CommonReportOptions,
  Config,
  Properties,
  ReportSuccessOptions,
} from '@/type';
import { fmt, globalNativeCallback } from '@/utils';
import { version } from '~/package.json';

/**
 * cocos CocosIOS bridge
 */
export class CocosIOS implements AnalysisDataTower {
  private readonly presetProperties = { '#sdk_type': 'cocos_ios', '#sdk_version_name': version };
  private dynamicProperties: null | (() => Properties) = null;

  private static callStaticMethod(method: string, ...args: any[]): any {
    return jsb.reflection.callStaticMethod('DTCocosCreatorProxyApi', method, ...args);
  }

  async initSDK(config: Config) {
    config = Object.assign({}, DEFAULT_INITIAL_CONFIG, config, { properties: this.presetProperties });
    const { app_id, server_url, ...otherConfig } = config;
    const nativeConfig = { ...otherConfig, appId: app_id, serverUrl: server_url };
    CocosIOS.callStaticMethod('initSDK:', fmt(nativeConfig));
  }
  track(eventName: string, properties: Properties): void {
    properties = { ...properties, ...this.dynamicProperties?.() };
    CocosIOS.callStaticMethod('track:properties:', eventName, fmt(properties));
  }
  enableUpload(): void {
    CocosIOS.callStaticMethod('enableUpload');
  }
  userSet(properties: Properties): void {
    CocosIOS.callStaticMethod('userSet:', fmt(properties));
  }
  userSetOnce(properties: Properties): void {
    CocosIOS.callStaticMethod('userSetOnce:', fmt(properties));
  }
  userAdd(properties: Record<string, number>): void {
    CocosIOS.callStaticMethod('userAdd:', fmt(properties));
  }
  userUnset(properties: string[]): void {
    // iOS接受字符串
    properties.forEach((prop) => CocosIOS.callStaticMethod('userUnset:', prop));
  }
  userDelete(): void {
    CocosIOS.callStaticMethod('userDelete');
  }
  userAppend(properties: ArrayProperties): void {
    CocosIOS.callStaticMethod('userAppend:', fmt(properties));
  }
  userUniqAppend(properties: ArrayProperties): void {
    CocosIOS.callStaticMethod('userUniqAppend:', fmt(properties));
  }
  getDataTowerId(callback: (id: string) => void): void;
  getDataTowerId(): Promise<string>;
  getDataTowerId(callback?: (id: string) => void): void | Promise<string> {
    if (!callback) return new Promise((resolve) => this.getDataTowerId(resolve));
    globalNativeCallback((cb) => CocosIOS.callStaticMethod('getDataTowerId:', cb), callback);
  }
  setAccountId(id: string): void {
    CocosIOS.callStaticMethod('setAccountId:', id);
  }
  setFirebaseAppInstanceId(id: string): void {
    CocosIOS.callStaticMethod('setFirebaseAppInstanceId:', id);
  }
  setAppsFlyerId(id: string): void {
    CocosIOS.callStaticMethod('setAppsFlyerId:', id);
  }
  setKochavaId(id: string): void {
    CocosIOS.callStaticMethod('setKochavaId:', id);
  }
  setAdjustId(id: string): void {
    CocosIOS.callStaticMethod('setAdjustId:', id);
  }
  setStaticCommonProperties(properties: Properties): void {
    CocosIOS.callStaticMethod('setStaticCommonProperties:', fmt(properties));
  }
  clearStaticCommonProperties(): void {
    CocosIOS.callStaticMethod('clearStaticCommonProperties');
  }
  setDynamicCommonProperties(callback: () => Properties): void {
    this.dynamicProperties = callback;
  }
  clearDynamicCommonProperties(): void {
    this.dynamicProperties = null;
  }

  trackTimerStart(eventName: string): void {
    CocosIOS.callStaticMethod('trackTimerStart:', eventName);
  }
  trackTimerPause(eventName: string): void {
    CocosIOS.callStaticMethod('trackTimerPause:', eventName);
  }
  trackTimerResume(eventName: string): void {
    CocosIOS.callStaticMethod('trackTimerResume:', eventName);
  }
  trackTimerEnd(eventName: string, properties: Properties): void {
    CocosIOS.callStaticMethod('trackTimerEnd:properties:', eventName, fmt(properties));
  }
  reportLoadBegin(opts: BaseReportOptions): void {
    CocosIOS.callStaticMethod('reportLoadBegin:', fmt(opts));
  }
  reportLoadEnd(
    opts: BaseReportOptions & { duration: number; result: boolean; errorCode: number; errorMessage: string },
  ): void {
    CocosIOS.callStaticMethod('reportLoadEnd:', fmt(opts));
  }
  reportToShow(opts: BaseReportOptions & CommonReportOptions): void {
    CocosIOS.callStaticMethod('reportToShow:', fmt(opts));
  }
  reportShow(opts: BaseReportOptions & CommonReportOptions): void {
    CocosIOS.callStaticMethod('reportShow:', fmt(opts));
  }
  reportShowFailed(opts: BaseReportOptions & CommonReportOptions & { errorCode: number; errorMessage: string }): void {
    CocosIOS.callStaticMethod('reportShowFailed:', fmt(opts));
  }
  reportClose(opts: BaseReportOptions & CommonReportOptions): void {
    CocosIOS.callStaticMethod('reportClose:', fmt(opts));
  }
  reportClick(opts: BaseReportOptions & CommonReportOptions): void {
    CocosIOS.callStaticMethod('reportClick:', fmt(opts));
  }
  reportRewarded(opts: BaseReportOptions & CommonReportOptions): void {
    CocosIOS.callStaticMethod('reportRewarded:', fmt(opts));
  }
  reportConversionByClick(opts: BaseReportOptions & CommonReportOptions): void {
    CocosIOS.callStaticMethod('reportConversionByClick:', fmt(opts));
  }
  reportConversionByLeftApp(opts: BaseReportOptions & CommonReportOptions): void {
    CocosIOS.callStaticMethod('reportConversionByLeftApp:', fmt(opts));
  }
  reportConversionByRewarded(opts: BaseReportOptions & CommonReportOptions): void {
    CocosIOS.callStaticMethod('reportConversionByRewarded:', fmt(opts));
  }
  reportPaid(opts: BaseReportPaidOptions & { country: string }): void;
  reportPaid(opts: BaseReportPaidOptions & { currency: string; entrance: string }): void;
  reportPaid(opts: BaseReportPaidOptions & ({ country: string } | { currency: string; entrance: string })): void {
    CocosIOS.callStaticMethod('reportPaid:', fmt(opts));
  }
  reportPurchaseSuccess(opts: ReportSuccessOptions & { order: string }): void {
    CocosIOS.callStaticMethod('reportPurchaseSuccess:', fmt(opts));
  }
  reportSubscribeSuccess(opts: ReportSuccessOptions & { originalOrderId: string; orderId: string }): void {
    CocosIOS.callStaticMethod('reportSubscribeSuccess:', fmt(opts));
  }
}
