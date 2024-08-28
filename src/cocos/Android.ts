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

type JavaType = keyof (typeof CocosAndroid)['typeMap'];

/**
 * cocos CocosAndroid bridge
 */
export class CocosAndroid implements AnalysisDataTower {
  private readonly presetProperties = { '#sdk_type': 'cocos_android', '#sdk_version_name': version };
  private dynamicProperties: null | (() => Properties) = null;

  private static readonly typeMap = {
    void: 'V',
    int: 'I',
    float: 'F',
    boolean: 'Z',
    String: 'Ljava/lang/String;',
  };
  private static callStaticMethod(
    method: string,
    retType: JavaType,
    ...parameters: [type: JavaType, value: any][]
  ): any {
    const signature = `(${parameters.map(([type]) => this.typeMap[type]).join('')})${this.typeMap[retType]}`;
    const values = parameters.map(([, value]) => value);
    return jsb.reflection.callStaticMethod('ai/datatower/bridge/DTCocosCreatorProxyApi', method, signature, ...values);
  }

  async initSDK(config: Config): Promise<void> {
    config = Object.assign({}, DEFAULT_INITIAL_CONFIG, config, { properties: this.presetProperties });
    const { app_id, server_url, ...otherConfig } = config;
    const nativeConfig = { ...otherConfig, appId: app_id, serverUrl: server_url };
    CocosAndroid.callStaticMethod('initSDK', 'void', ['String', fmt(nativeConfig)]);
  }
  track(eventName: string, properties: Properties): void {
    CocosAndroid.callStaticMethod(
      'track',
      'void',
      ['String', eventName],
      ['String', fmt({ ...properties, ...this.dynamicProperties?.() })],
    );
  }
  enableUpload(): void {
    CocosAndroid.callStaticMethod('enableUpload', 'void');
  }
  userSet(properties: Properties): void {
    CocosAndroid.callStaticMethod('userSet', 'void', ['String', fmt(properties)]);
  }
  userSetOnce(properties: Properties): void {
    CocosAndroid.callStaticMethod('userSetOnce', 'void', ['String', fmt(properties)]);
  }
  userAdd(properties: Record<string, number>): void {
    CocosAndroid.callStaticMethod('userAdd', 'void', ['String', fmt(properties)]);
  }
  userUnset(properties: string[]): void {
    CocosAndroid.callStaticMethod('userUnset', 'void', ['String', fmt(properties)]);
  }
  userDelete(): void {
    CocosAndroid.callStaticMethod('userDelete', 'void');
  }
  userAppend(properties: ArrayProperties): void {
    CocosAndroid.callStaticMethod('userAppend', 'void', ['String', fmt(properties)]);
  }
  userUniqAppend(properties: ArrayProperties): void {
    CocosAndroid.callStaticMethod('userUniqAppend', 'void', ['String', fmt(properties)]);
  }
  getDataTowerId(callback: (id: string) => void): void;
  getDataTowerId(): Promise<string>;
  getDataTowerId(callback?: (id: string) => void): void | Promise<string> {
    if (!callback) return new Promise((resolve) => this.getDataTowerId(resolve));
    globalNativeCallback((cb) => CocosAndroid.callStaticMethod('getDataTowerId', 'void', ['String', cb]), callback);
  }
  setAccountId(id: string): void {
    CocosAndroid.callStaticMethod('setAccountId', 'void', ['String', id]);
  }
  setFirebaseAppInstanceId(id: string): void {
    CocosAndroid.callStaticMethod('setFirebaseAppInstanceId', 'void', ['String', id]);
  }
  setAppsFlyerId(id: string): void {
    CocosAndroid.callStaticMethod('setAppsFlyerId', 'void', ['String', id]);
  }
  setKochavaId(id: string): void {
    CocosAndroid.callStaticMethod('setKochavaId', 'void', ['String', id]);
  }
  setAdjustId(id: string): void {
    CocosAndroid.callStaticMethod('setAdjustId', 'void', ['String', id]);
  }
  setStaticCommonProperties(properties: Properties): void {
    CocosAndroid.callStaticMethod('setStaticCommonProperties', 'void', ['String', fmt(properties)]);
  }
  clearStaticCommonProperties(): void {
    CocosAndroid.callStaticMethod('clearStaticCommonProperties', 'void');
  }
  setDynamicCommonProperties(callback: () => Properties): void {
    this.dynamicProperties = callback;
  }
  clearDynamicCommonProperties(): void {
    this.dynamicProperties = null;
  }

  trackTimerStart(eventName: string): void {
    CocosAndroid.callStaticMethod('trackTimerStart', 'void', ['String', eventName]);
  }
  trackTimerPause(eventName: string): void {
    CocosAndroid.callStaticMethod('trackTimerPause', 'void', ['String', eventName]);
  }
  trackTimerResume(eventName: string): void {
    CocosAndroid.callStaticMethod('trackTimerResume', 'void', ['String', eventName]);
  }
  trackTimerEnd(eventName: string, properties: Properties): void {
    CocosAndroid.callStaticMethod('trackTimerEnd', 'void', ['String', eventName], ['String', fmt(properties)]);
  }
  reportLoadBegin(opts: BaseReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportLoadBegin',
      'void',
      ['String', opts.id],
      ['int', opts.type],
      ['int', opts.platform],
      ['String', opts.seq],
      ['String', fmt(opts.properties)],
      ['int', opts.mediation],
      ['String', opts.mediationId],
    );
  }
  reportLoadEnd(
    opts: BaseReportOptions & { duration: number; result: boolean; errorCode: number; errorMessage: string },
  ): void {
    CocosAndroid.callStaticMethod(
      'reportLoadEnd',
      'void',
      ['String', opts.id],
      ['int', opts.type],
      ['int', opts.platform],
      ['float', opts.duration],
      ['boolean', opts.result],
      ['String', opts.seq],
      ['int', opts.errorCode],
      ['String', opts.errorMessage],
      ['String', fmt(opts.properties)],
      ['int', opts.mediation],
      ['String', opts.mediationId],
    );
  }
  reportToShow(opts: BaseReportOptions & CommonReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportToShow',
      'void',
      ['String', opts.id],
      ['int', opts.type],
      ['int', opts.platform],
      ['String', opts.location],
      ['String', opts.seq],
      ['String', fmt(opts.properties)],
      ['String', opts.entrance],
      ['int', opts.mediation],
      ['String', opts.mediationId],
    );
  }
  reportShow(opts: BaseReportOptions & CommonReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportShow',
      'void',
      ['String', opts.id],
      ['int', opts.type],
      ['int', opts.platform],
      ['String', opts.location],
      ['String', opts.seq],
      ['String', fmt(opts.properties)],
      ['String', opts.entrance],
      ['int', opts.mediation],
      ['String', opts.mediationId],
    );
  }
  reportShowFailed(opts: BaseReportOptions & CommonReportOptions & { errorCode: number; errorMessage: string }): void {
    CocosAndroid.callStaticMethod(
      'reportShowFailed',
      'void',
      ['String', opts.id],
      ['int', opts.type],
      ['int', opts.platform],
      ['String', opts.location],
      ['String', opts.seq],
      ['int', opts.errorCode],
      ['String', opts.errorMessage],
      ['String', fmt(opts.properties)],
      ['String', opts.entrance],
      ['int', opts.mediation],
      ['String', opts.mediationId],
    );
  }
  reportClose(opts: BaseReportOptions & CommonReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportClose',
      'void',
      ['String', opts.id],
      ['int', opts.type],
      ['int', opts.platform],
      ['String', opts.location],
      ['String', opts.seq],
      ['String', fmt(opts.properties)],
      ['String', opts.entrance],
      ['int', opts.mediation],
      ['String', opts.mediationId],
    );
  }
  reportClick(opts: BaseReportOptions & CommonReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportClick',
      'void',
      ['String', opts.id],
      ['int', opts.type],
      ['int', opts.platform],
      ['String', opts.location],
      ['String', opts.seq],
      ['String', fmt(opts.properties)],
      ['String', opts.entrance],
      ['int', opts.mediation],
      ['String', opts.mediationId],
    );
  }
  reportRewarded(opts: BaseReportOptions & CommonReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportRewarded',
      'void',
      ['String', opts.id],
      ['int', opts.type],
      ['int', opts.platform],
      ['String', opts.location],
      ['String', opts.seq],
      ['String', fmt(opts.properties)],
      ['String', opts.entrance],
      ['int', opts.mediation],
      ['String', opts.mediationId],
    );
  }
  reportConversionByClick(opts: BaseReportOptions & CommonReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportConversionByClick',
      'void',
      ['String', opts.id],
      ['int', opts.type],
      ['int', opts.platform],
      ['String', opts.location],
      ['String', opts.seq],
      ['String', fmt(opts.properties)],
      ['String', opts.entrance],
      ['int', opts.mediation],
      ['String', opts.mediationId],
    );
  }
  reportConversionByLeftApp(opts: BaseReportOptions & CommonReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportConversionByLeftApp',
      'void',
      ['String', opts.id],
      ['int', opts.type],
      ['int', opts.platform],
      ['String', opts.location],
      ['String', opts.seq],
      ['String', fmt(opts.properties)],
      ['String', opts.entrance],
      ['int', opts.mediation],
      ['String', opts.mediationId],
    );
  }
  reportConversionByRewarded(opts: BaseReportOptions & CommonReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportConversionByRewarded',
      'void',
      ['String', opts.id],
      ['int', opts.type],
      ['int', opts.platform],
      ['String', opts.location],
      ['String', opts.seq],
      ['String', fmt(opts.properties)],
      ['String', opts.entrance],
      ['int', opts.mediation],
      ['String', opts.mediationId],
    );
  }
  reportPaid(opts: BaseReportPaidOptions & { country: string }): void;
  reportPaid(opts: BaseReportPaidOptions & { currency: string; entrance: string }): void;
  reportPaid(opts: BaseReportPaidOptions & ({ country: string } | { currency: string; entrance: string })): void {
    if ('country' in opts) {
      CocosAndroid.callStaticMethod(
        'reportPaid',
        'void',
        ['String', opts.id],
        ['int', opts.type],
        ['int', opts.platform],
        ['String', opts.location],
        ['String', opts.seq],
        ['int', opts.mediation],
        ['String', opts.mediationId],
        ['float', opts.value],
        ['String', opts.precision],
        ['String', opts.country],
        ['String', fmt(opts.properties)],
      );
    } else {
      CocosAndroid.callStaticMethod(
        'reportPaid',
        'void',
        ['String', opts.id],
        ['int', opts.type],
        ['int', opts.platform],
        ['String', opts.location],
        ['String', opts.seq],
        ['float', opts.value],
        ['String', opts.currency],
        ['String', opts.precision],
        ['String', fmt(opts.properties)],
        ['String', opts.entrance],
        ['int', opts.mediation],
        ['String', opts.mediationId],
      );
    }
  }
  reportPurchaseSuccess(opts: ReportSuccessOptions & { order: string }): void {
    CocosAndroid.callStaticMethod(
      'reportPurchaseSuccess',
      'void',
      ['String', opts.order],
      ['String', opts.sku],
      ['float', opts.price],
      ['String', opts.currency],
      ['String', fmt(opts.properties)],
    );
  }
  reportSubscribeSuccess(opts: ReportSuccessOptions & { originalOrderId: string; orderId: string }): void {
    CocosAndroid.callStaticMethod(
      'reportSubscribeSuccess',
      'void',
      ['String', opts.originalOrderId],
      ['String', opts.orderId],
      ['String', opts.sku],
      ['float', opts.price],
      ['String', opts.currency],
      ['String', fmt(opts.properties)],
    );
  }
}
