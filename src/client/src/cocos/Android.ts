import { version } from '@/package.json';
import { DataTower, StaticDataTower } from '@/src/StaticDataTower';
import { AndroidClass, DEFAULT_INITIAL_CONFIG } from '@/src/constant';
import type {
  BaseReportOptions,
  BaseReportPaidOptions,
  CommonReportOptions,
  Config,
  PublicKey,
  ReportSuccessOptions,
} from '@/src/type';
import { fmt, globalNativeCallback } from '@/src/utils';

type JavaType = 'void' | 'int' | 'float' | 'double' | 'long' | 'boolean' | 'String';

/**
 * cocos CocosAndroid bridge
 */
export class CocosAndroid extends StaticDataTower implements DataTower {
  protected static createInstance = () => new CocosAndroid();
  private presetProperties = { '#sdk_type': 'cocos_android', '#sdk_version_name': version } as const;
  private dynamicProperties: null | (() => Record<string, string | boolean | number>) = null;

  private static typeMap: Record<JavaType, string> = {
    void: 'V',
    int: 'I',
    float: 'F',
    double: 'D',
    long: 'J',
    boolean: 'Z',
    String: 'Ljava/lang/String;',
  };
  private static callStaticMethod(method: string, parameters: [type: JavaType, value: any][], retType: JavaType): any {
    const signature = `(${parameters.map(([type]) => this.typeMap[type]).join('')})${this.typeMap[retType]}`;
    const values = parameters.map(([, value]) => value);
    return globalThis.jsb.reflection.callStaticMethod(AndroidClass, method, signature, ...values);
  }

  async initSDK(config: Config): Promise<void> {
    config = Object.assign({}, DEFAULT_INITIAL_CONFIG, config, { properties: this.presetProperties });
    CocosAndroid.callStaticMethod('initSDK', [['String', fmt(config)]], 'void');
  }
  track(eventName: string, properties: Record<string, string | boolean | number>): void {
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
  userSet<K extends string>(properties: Record<PublicKey<K>, string | boolean | number>): void {
    CocosAndroid.callStaticMethod('userSet', [['String', fmt(properties)]], 'void');
  }
  userSetOnce<K extends string>(properties: Record<PublicKey<K>, string | boolean | number>): void {
    CocosAndroid.callStaticMethod('userSetOnce', [['String', fmt(properties)]], 'void');
  }
  userAdd<K extends string>(properties: Record<PublicKey<K>, number>): void {
    CocosAndroid.callStaticMethod('userAdd', [['String', fmt(properties)]], 'void');
  }
  userUnset(properties: string[]): void {
    CocosAndroid.callStaticMethod('userUnset', [['String', fmt(properties)]], 'void');
  }
  userDelete(): void {
    CocosAndroid.callStaticMethod('userDelete', [], 'void');
  }
  userAppend<K extends string>(properties: Record<PublicKey<K>, any[]>): void {
    CocosAndroid.callStaticMethod('userAppend', [['String', fmt(properties)]], 'void');
  }
  userUniqAppend<K extends string>(properties: Record<PublicKey<K>, any[]>): void {
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
  setStaticCommonProperties<K extends string>(properties: Record<PublicKey<K>, string | boolean | number>): void {
    CocosAndroid.callStaticMethod('setStaticCommonProperties', [['String', fmt(properties)]], 'void');
  }
  clearStaticCommonProperties(): void {
    CocosAndroid.callStaticMethod('clearStaticCommonProperties', [], 'void');
  }
  setCommonProperties(callback: () => Record<string, string | boolean | number>): void {
    this.dynamicProperties = callback;
  }
  clearCommonProperties(): void {
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
  trackTimerEnd<K extends string>(
    eventName: string,
    properties: Record<PublicKey<K>, string | boolean | number>,
  ): void {
    CocosAndroid.callStaticMethod(
      'trackTimerEnd',
      [
        ['String', eventName],
        ['String', fmt(properties)],
      ],
      'void',
    );
  }
  reportLoadBegin<K extends string>(options: BaseReportOptions<K> & CommonReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportLoadBegin',
      [
        ['String', options.id],
        ['int', options.type],
        ['int', options.platform],
        ['String', options.seq],
        ['String', fmt(options.properties)],
        ['int', options.mediation],
        ['String', options.mediationId],
      ],
      'void',
    );
  }
  reportLoadEnd<K extends string>(
    options: BaseReportOptions<K> &
      CommonReportOptions & { duration: number; result: boolean; errorCode: number; errorMessage: string },
  ): void {
    CocosAndroid.callStaticMethod(
      'reportLoadEnd',
      [
        ['String', options.id],
        ['int', options.type],
        ['int', options.platform],
        ['long', options.duration],
        ['boolean', options.result],
        ['String', options.seq],
        ['int', options.errorCode],
        ['String', options.errorMessage],
        ['String', fmt(options.properties)],
        ['int', options.mediation],
        ['String', options.mediationId],
      ],
      'void',
    );
  }
  reportToShow<K extends string>(options: BaseReportOptions<K> & CommonReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportToShow',
      [
        ['String', options.id],
        ['int', options.type],
        ['int', options.platform],
        ['String', options.location],
        ['String', options.seq],
        ['String', fmt(options.properties)],
        ['String', options.entrance],
        ['int', options.mediation],
        ['String', options.mediationId],
      ],
      'void',
    );
  }
  reportShow<K extends string>(options: BaseReportOptions<K> & CommonReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportShow',
      [
        ['String', options.id],
        ['int', options.type],
        ['int', options.platform],
        ['String', options.location],
        ['String', options.seq],
        ['String', fmt(options.properties)],
        ['String', options.entrance],
        ['int', options.mediation],
        ['String', options.mediationId],
      ],
      'void',
    );
  }
  reportShowFailed<K extends string>(
    options: BaseReportOptions<K> & CommonReportOptions & { errorCode: number; errorMessage: string },
  ): void {
    CocosAndroid.callStaticMethod(
      'reportShowFailed',
      [
        ['String', options.id],
        ['int', options.type],
        ['int', options.platform],
        ['String', options.location],
        ['String', options.seq],
        ['int', options.errorCode],
        ['String', options.errorMessage],
        ['String', fmt(options.properties)],
        ['String', options.entrance],
        ['int', options.mediation],
        ['String', options.mediationId],
      ],
      'void',
    );
  }
  reportClose<K extends string>(options: BaseReportOptions<K> & CommonReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportClose',
      [
        ['String', options.id],
        ['int', options.type],
        ['int', options.platform],
        ['String', options.location],
        ['String', options.seq],
        ['String', fmt(options.properties)],
        ['String', options.entrance],
        ['int', options.mediation],
        ['String', options.mediationId],
      ],
      'void',
    );
  }
  reportClick<K extends string>(options: BaseReportOptions<K> & CommonReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportClick',
      [
        ['String', options.id],
        ['int', options.type],
        ['int', options.platform],
        ['String', options.location],
        ['String', options.seq],
        ['String', fmt(options.properties)],
        ['String', options.entrance],
        ['int', options.mediation],
        ['String', options.mediationId],
      ],
      'void',
    );
  }
  reportRewarded<K extends string>(options: BaseReportOptions<K> & CommonReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportRewarded',
      [
        ['String', options.id],
        ['int', options.type],
        ['int', options.platform],
        ['String', options.location],
        ['String', options.seq],
        ['String', fmt(options.properties)],
        ['String', options.entrance],
        ['int', options.mediation],
        ['String', options.mediationId],
      ],
      'void',
    );
  }
  reportConversionByClick<K extends string>(options: BaseReportOptions<K> & CommonReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportConversionByClick',
      [
        ['String', options.id],
        ['int', options.type],
        ['int', options.platform],
        ['String', options.location],
        ['String', options.seq],
        ['String', fmt(options.properties)],
        ['String', options.entrance],
        ['int', options.mediation],
        ['String', options.mediationId],
      ],
      'void',
    );
  }
  reportConversionByLeftApp<K extends string>(options: BaseReportOptions<K> & CommonReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportConversionByLeftApp',
      [
        ['String', options.id],
        ['int', options.type],
        ['int', options.platform],
        ['String', options.location],
        ['String', options.seq],
        ['String', fmt(options.properties)],
        ['String', options.entrance],
        ['int', options.mediation],
        ['String', options.mediationId],
      ],
      'void',
    );
  }
  reportConversionByRewarded<K extends string>(options: BaseReportOptions<K> & CommonReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportConversionByRewarded',
      [
        ['String', options.id],
        ['int', options.type],
        ['int', options.platform],
        ['String', options.location],
        ['String', options.seq],
        ['String', fmt(options.properties)],
        ['String', options.entrance],
        ['int', options.mediation],
        ['String', options.mediationId],
      ],
      'void',
    );
  }
  reportPaid<K extends string>(options: BaseReportPaidOptions<K> & { country: string }): void;
  reportPaid<K extends string>(options: BaseReportPaidOptions<K> & { currency: string; entrance: string }): void;
  reportPaid<K extends string>(
    options: BaseReportPaidOptions<K> & ({ country: string } | { currency: string; entrance: string }),
  ): void {
    if ('country' in options) {
      CocosAndroid.callStaticMethod(
        'reportPaid',
        [
          ['String', options.id],
          ['int', options.type],
          ['int', options.platform],
          ['String', options.location],
          ['String', options.seq],
          ['int', options.mediation],
          ['String', options.mediationId],
          ['double', options.value],
          ['String', options.precision],
          ['String', options.country],
          ['String', fmt(options.properties)],
        ],
        'void',
      );
    } else {
      CocosAndroid.callStaticMethod(
        'reportPaid',
        [
          ['String', options.id],
          ['int', options.type],
          ['int', options.platform],
          ['String', options.location],
          ['String', options.seq],
          ['double', options.value],
          ['String', options.currency],
          ['String', options.precision],
          ['String', fmt(options.properties)],
          ['String', options.entrance],
          ['int', options.mediation],
          ['String', options.mediationId],
        ],
        'void',
      );
    }
  }
  reportLeftApp<K extends string>(options: BaseReportOptions<K> & CommonReportOptions): void {
    CocosAndroid.callStaticMethod(
      'reportLeftApp',
      [
        ['String', options.id],
        ['int', options.type],
        ['int', options.platform],
        ['String', options.location],
        ['String', options.seq],
        ['String', fmt(options.properties)],
        ['String', options.entrance],
        ['int', options.mediation],
        ['String', options.mediationId],
      ],
      'void',
    );
  }
  reportPurchaseSuccess<K extends string>(options: ReportSuccessOptions<K> & { order: string }): void {
    CocosAndroid.callStaticMethod(
      'reportPurchaseSuccess',
      [
        ['String', options.order],
        ['String', options.sku],
        ['double', options.price],
        ['String', options.currency],
        ['String', fmt(options.properties)],
      ],
      'void',
    );
  }
  reportSubscribeSuccess<K extends string>(
    options: ReportSuccessOptions<K> & { originalOrderId: string; orderId: string },
  ): void {
    CocosAndroid.callStaticMethod(
      'reportSubscribeSuccess',
      [
        ['String', options.originalOrderId],
        ['String', options.orderId],
        ['String', options.sku],
        ['double', options.price],
        ['String', options.currency],
        ['String', fmt(options.properties)],
      ],
      'void',
    );
  }
}

export { CocosAndroid as StaticDataTower };
export default CocosAndroid;
