import { version } from '@/package.json';
import { DataTower, StaticDataTower } from '@/src/StaticDataTower';
import { DEFAULT_INITIAL_CONFIG, IOSClass } from '@/src/constant';
import type {
  BaseReportOptions,
  BaseReportPaidOptions,
  CommonReportOptions,
  Config,
  Properties,
  PublicKey,
  ReportSuccessOptions,
} from '@/src/type';
import { fmt, globalNativeCallback } from '@/src/utils';

/**
 * cocos CocosIOS bridge
 */
export class CocosIOS extends StaticDataTower implements DataTower {
  protected static createInstance = () => new CocosIOS();
  private presetProperties = { '#sdk_type': 'cocos_ios', '#sdk_version_name': version } as const;
  private dynamicProperties: null | (() => Record<string, string | boolean | number>) = null;

  private static callStaticMethod(method: string, ...args: any[]): any {
    return globalThis.jsb.reflection.callStaticMethod(IOSClass, method, ...args);
  }

  async initSDK(config: Config) {
    config = Object.assign({}, DEFAULT_INITIAL_CONFIG, config, { properties: this.presetProperties });
    CocosIOS.callStaticMethod('initSDK:', fmt(config));
  }
  track(eventName: string, properties: Record<string, string | boolean | number>): void {
    properties = { ...properties, ...this.dynamicProperties?.() };
    CocosIOS.callStaticMethod('track:properties:', eventName, fmt(properties));
  }
  enableUpload(): void {
    CocosIOS.callStaticMethod('enableUpload');
  }
  userSet<K extends string>(properties: Record<PublicKey<K>, string | boolean | number>): void {
    CocosIOS.callStaticMethod('userSet:', fmt(properties));
  }
  userSetOnce<K extends string>(properties: Record<PublicKey<K>, string | boolean | number>): void {
    CocosIOS.callStaticMethod('userSetOnce:', fmt(properties));
  }
  userAdd<K extends string>(properties: Record<PublicKey<K>, number>): void {
    CocosIOS.callStaticMethod('userAdd:', fmt(properties));
  }
  userUnset(properties: string[]): void {
    // iOS接受字符串
    properties.forEach((prop) => CocosIOS.callStaticMethod('userUnset:', prop));
  }
  userDelete(): void {
    CocosIOS.callStaticMethod('userDelete');
  }
  userAppend<K extends string>(properties: Record<PublicKey<K>, any[]>): void {
    CocosIOS.callStaticMethod('userAppend:', fmt(properties));
  }
  userUniqAppend<K extends string>(properties: Record<PublicKey<K>, any[]>): void {
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
  setStaticCommonProperties<K extends string>(properties: Record<PublicKey<K>, string | boolean | number>): void {
    CocosIOS.callStaticMethod('setStaticCommonProperties:', fmt(properties));
  }
  clearStaticCommonProperties(): void {
    CocosIOS.callStaticMethod('clearStaticCommonProperties');
  }
  setCommonProperties(callback: () => Record<string, string | boolean | number>): void {
    this.dynamicProperties = callback;
  }
  clearCommonProperties(): void {
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
  trackTimerEnd<K extends string>(eventName: string, properties: Properties<K>): void {
    CocosIOS.callStaticMethod('trackTimerEnd:properties:', eventName, fmt(properties));
  }
  // TODO: implement the following methods
  reportLoadBegin<K extends string>(options: BaseReportOptions<K> & CommonReportOptions): void {
    var jsonStr: string = JSON.stringify(options);
    CocosIOS.callStaticMethod('reportLoadBegin:', jsonStr);
  }
  reportLoadEnd<K extends string>(
    options: BaseReportOptions<K> &
      CommonReportOptions & { duration: number; result: boolean; errorCode: number; errorMessage: string },
  ): void {
    throw new Error('Method not implemented.');
  }
  reportToShow<K extends string>(options: BaseReportOptions<K> & CommonReportOptions): void {
    throw new Error('Method not implemented.');
  }
  reportShow<K extends string>(options: BaseReportOptions<K> & CommonReportOptions): void {
    throw new Error('Method not implemented.');
  }
  reportShowFailed<K extends string>(
    options: BaseReportOptions<K> & CommonReportOptions & { errorCode: number; errorMessage: string },
  ): void {
    throw new Error('Method not implemented.');
  }
  reportClose<K extends string>(options: BaseReportOptions<K> & CommonReportOptions): void {
    throw new Error('Method not implemented.');
  }
  reportClick<K extends string>(options: BaseReportOptions<K> & CommonReportOptions): void {
    throw new Error('Method not implemented.');
  }
  reportRewarded<K extends string>(options: BaseReportOptions<K> & CommonReportOptions): void {
    throw new Error('Method not implemented.');
  }
  reportConversionByClick<K extends string>(options: BaseReportOptions<K> & CommonReportOptions): void {
    throw new Error('Method not implemented.');
  }
  reportConversionByLeftApp<K extends string>(options: BaseReportOptions<K> & CommonReportOptions): void {
    throw new Error('Method not implemented.');
  }
  reportConversionByRewarded<K extends string>(options: BaseReportOptions<K> & CommonReportOptions): void {
    throw new Error('Method not implemented.');
  }
  reportPaid<K extends string>(options: BaseReportPaidOptions<K> & { country: string }): void;
  reportPaid<K extends string>(options: BaseReportPaidOptions<K> & { currency: string; entrance: string }): void;
  reportPaid<K extends string>(
    options: BaseReportPaidOptions<K> & { country: string } & { currency: string; entrance: string },
  ): void {
    throw new Error('Method not implemented.');
  }
  reportLeftApp<K extends string>(options: BaseReportOptions<K> & CommonReportOptions): void {
    throw new Error('Method not implemented.');
  }
  reportPurchaseSuccess<K extends string>(options: ReportSuccessOptions<K> & { order: string }): void {
    throw new Error('Method not implemented.');
  }
  reportSubscribeSuccess<K extends string>(
    options: ReportSuccessOptions<K> & { originalOrderId: string; orderId: string },
  ): void {
    throw new Error('Method not implemented.');
  }
}

export { CocosIOS as DataTower };
export default CocosIOS;
