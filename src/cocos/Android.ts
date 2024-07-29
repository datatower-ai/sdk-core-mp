import { AnalysisDataTower } from '@/StaticDataTower';
import { AndroidClass, DEFAULT_INITIAL_CONFIG } from '@/constant';
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
  private static callStaticMethod(method: string, parameters: [type: JavaType, value: any][], retType: JavaType): any {
    const signature = `(${parameters.map(([type]) => this.typeMap[type]).join('')})${this.typeMap[retType]}`;
    const values = parameters.map(([, value]) => value);
    return jsb.reflection.callStaticMethod(AndroidClass, method, signature, ...values);
  }

  async initSDK(config: Config): Promise<void> {
    config = Object.assign({}, DEFAULT_INITIAL_CONFIG, config, { properties: this.presetProperties });
    const { app_id, server_url, ...otherConfig } = config;
    const nativeConfig = { ...otherConfig, appId: app_id, serverUrl: server_url };
    CocosAndroid.callStaticMethod('initSDK', [['String', fmt(nativeConfig)]], 'void');
  }
  track(eventName: string, properties: Properties): void {
    CocosAndroid.callStaticMethod(
      'track',
      [
        ['String', eventName],
        ['String', fmt({ ...properties, ...this.dynamicProperties?.() })],
      ],
      'void',
    );
  }
  enableUpload(): void {
    CocosAndroid.callStaticMethod('enableUpload', [], 'void');
  }
  userSet(properties: Properties): void {
    CocosAndroid.callStaticMethod('userSet', [['String', fmt(properties)]], 'void');
  }
  userSetOnce(properties: Properties): void {
    CocosAndroid.callStaticMethod('userSetOnce', [['String', fmt(properties)]], 'void');
  }
  userAdd(properties: Record<string, number>): void {
    CocosAndroid.callStaticMethod('userAdd', [['String', fmt(properties)]], 'void');
  }
  userUnset(properties: string[]): void {
    CocosAndroid.callStaticMethod('userUnset', [['String', fmt(properties)]], 'void');
  }
  userDelete(): void {
    CocosAndroid.callStaticMethod('userDelete', [], 'void');
  }
  userAppend(properties: ArrayProperties): void {
    CocosAndroid.callStaticMethod('userAppend', [['String', fmt(properties)]], 'void');
  }
  userUniqAppend(properties: ArrayProperties): void {
    CocosAndroid.callStaticMethod('userUniqAppend', [['String', fmt(properties)]], 'void');
  }
  getDataTowerId(callback: (id: string) => void): void;
  getDataTowerId(): Promise<string>;
  getDataTowerId(callback?: (id: string) => void): void | Promise<string> {
    if (!callback) return new Promise((resolve) => this.getDataTowerId(resolve));
    globalNativeCallback((cb) => CocosAndroid.callStaticMethod('getDataTowerId', [['String', cb]], 'void'), callback);
  }
  setAccountId(id: string): void {
    CocosAndroid.callStaticMethod('setAccountId', [['String', id]], 'void');
  }
  setFirebaseAppInstanceId(id: string): void {
    CocosAndroid.callStaticMethod('setFirebaseAppInstanceId', [['String', id]], 'void');
  }
  setAppsFlyerId(id: string): void {
    CocosAndroid.callStaticMethod('setAppsFlyerId', [['String', id]], 'void');
  }
  setKochavaId(id: string): void {
    CocosAndroid.callStaticMethod('setKochavaId', [['String', id]], 'void');
  }
  setAdjustId(id: string): void {
    CocosAndroid.callStaticMethod('setAdjustId', [['String', id]], 'void');
  }
  setStaticCommonProperties(properties: Properties): void {
    CocosAndroid.callStaticMethod('setStaticCommonProperties', [['String', fmt(properties)]], 'void');
  }
  clearStaticCommonProperties(): void {
    CocosAndroid.callStaticMethod('clearStaticCommonProperties', [], 'void');
  }
  setDynamicCommonProperties(callback: () => Properties): void {
    this.dynamicProperties = callback;
  }
  clearDynamicCommonProperties(): void {
    this.dynamicProperties = null;
  }

  trackTimerStart(eventName: string): void {
    CocosAndroid.callStaticMethod('trackTimerStart', [['String', eventName]], 'void');
  }
  trackTimerPause(eventName: string): void {
    CocosAndroid.callStaticMethod('trackTimerPause', [['String', eventName]], 'void');
  }
  trackTimerResume(eventName: string): void {
    CocosAndroid.callStaticMethod('trackTimerResume', [['String', eventName]], 'void');
  }
  trackTimerEnd(eventName: string, properties: Properties): void {
    CocosAndroid.callStaticMethod(
      'trackTimerEnd',
      [
        ['String', eventName],
        ['String', fmt(properties)],
      ],
      'void',
    );
  }
  reportLoadBegin(opts: BaseReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportLoadBegin',
      [
        ['String', opts.id],
        ['int', opts.type],
        ['int', opts.platform],
        ['String', opts.seq],
        ['String', fmt(opts.properties)],
        ['int', opts.mediation],
        ['String', opts.mediationId],
      ],
      'void',
    );
  }
  reportLoadEnd(
    opts: BaseReportOptions & { duration: number; result: boolean; errorCode: number; errorMessage: string },
  ): void {
    CocosAndroid.callStaticMethod(
      'reportLoadEnd',
      [
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
      ],
      'void',
    );
  }
  reportToShow(opts: BaseReportOptions & CommonReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportToShow',
      [
        ['String', opts.id],
        ['int', opts.type],
        ['int', opts.platform],
        ['String', opts.location],
        ['String', opts.seq],
        ['String', fmt(opts.properties)],
        ['String', opts.entrance],
        ['int', opts.mediation],
        ['String', opts.mediationId],
      ],
      'void',
    );
  }
  reportShow(opts: BaseReportOptions & CommonReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportShow',
      [
        ['String', opts.id],
        ['int', opts.type],
        ['int', opts.platform],
        ['String', opts.location],
        ['String', opts.seq],
        ['String', fmt(opts.properties)],
        ['String', opts.entrance],
        ['int', opts.mediation],
        ['String', opts.mediationId],
      ],
      'void',
    );
  }
  reportShowFailed(opts: BaseReportOptions & CommonReportOptions & { errorCode: number; errorMessage: string }): void {
    CocosAndroid.callStaticMethod(
      'reportShowFailed',
      [
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
      ],
      'void',
    );
  }
  reportClose(opts: BaseReportOptions & CommonReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportClose',
      [
        ['String', opts.id],
        ['int', opts.type],
        ['int', opts.platform],
        ['String', opts.location],
        ['String', opts.seq],
        ['String', fmt(opts.properties)],
        ['String', opts.entrance],
        ['int', opts.mediation],
        ['String', opts.mediationId],
      ],
      'void',
    );
  }
  reportClick(opts: BaseReportOptions & CommonReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportClick',
      [
        ['String', opts.id],
        ['int', opts.type],
        ['int', opts.platform],
        ['String', opts.location],
        ['String', opts.seq],
        ['String', fmt(opts.properties)],
        ['String', opts.entrance],
        ['int', opts.mediation],
        ['String', opts.mediationId],
      ],
      'void',
    );
  }
  reportRewarded(opts: BaseReportOptions & CommonReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportRewarded',
      [
        ['String', opts.id],
        ['int', opts.type],
        ['int', opts.platform],
        ['String', opts.location],
        ['String', opts.seq],
        ['String', fmt(opts.properties)],
        ['String', opts.entrance],
        ['int', opts.mediation],
        ['String', opts.mediationId],
      ],
      'void',
    );
  }
  reportConversionByClick(opts: BaseReportOptions & CommonReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportConversionByClick',
      [
        ['String', opts.id],
        ['int', opts.type],
        ['int', opts.platform],
        ['String', opts.location],
        ['String', opts.seq],
        ['String', fmt(opts.properties)],
        ['String', opts.entrance],
        ['int', opts.mediation],
        ['String', opts.mediationId],
      ],
      'void',
    );
  }
  reportConversionByLeftApp(opts: BaseReportOptions & CommonReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportConversionByLeftApp',
      [
        ['String', opts.id],
        ['int', opts.type],
        ['int', opts.platform],
        ['String', opts.location],
        ['String', opts.seq],
        ['String', fmt(opts.properties)],
        ['String', opts.entrance],
        ['int', opts.mediation],
        ['String', opts.mediationId],
      ],
      'void',
    );
  }
  reportConversionByRewarded(opts: BaseReportOptions & CommonReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportConversionByRewarded',
      [
        ['String', opts.id],
        ['int', opts.type],
        ['int', opts.platform],
        ['String', opts.location],
        ['String', opts.seq],
        ['String', fmt(opts.properties)],
        ['String', opts.entrance],
        ['int', opts.mediation],
        ['String', opts.mediationId],
      ],
      'void',
    );
  }
  reportPaid(opts: BaseReportPaidOptions & { country: string }): void;
  reportPaid(opts: BaseReportPaidOptions & { currency: string; entrance: string }): void;
  reportPaid(opts: BaseReportPaidOptions & ({ country: string } | { currency: string; entrance: string })): void {
    if ('country' in opts) {
      CocosAndroid.callStaticMethod(
        'reportPaid',
        [
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
        ],
        'void',
      );
    } else {
      CocosAndroid.callStaticMethod(
        'reportPaid',
        [
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
        ],
        'void',
      );
    }
  }
  reportPurchaseSuccess(opts: ReportSuccessOptions & { order: string }): void {
    CocosAndroid.callStaticMethod(
      'reportPurchaseSuccess',
      [
        ['String', opts.order],
        ['String', opts.sku],
        ['float', opts.price],
        ['String', opts.currency],
        ['String', fmt(opts.properties)],
      ],
      'void',
    );
  }
  reportSubscribeSuccess(opts: ReportSuccessOptions & { originalOrderId: string; orderId: string }): void {
    CocosAndroid.callStaticMethod(
      'reportSubscribeSuccess',
      [
        ['String', opts.originalOrderId],
        ['String', opts.orderId],
        ['String', opts.sku],
        ['float', opts.price],
        ['String', opts.currency],
        ['String', fmt(opts.properties)],
      ],
      'void',
    );
  }
}
