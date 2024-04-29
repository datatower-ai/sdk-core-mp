/**
 * @file type.ts
 * 该文件下的类型是需要导出给用户使用的类型
 * 内部使用的类型不应写在该文件下
 */
/**
 * 广告类型
 */
declare enum AdType {
    /**
     * 未知类型
     */
    UNKNOWN = -1,
    /**
     * 横幅广告
     */
    BANNER = 0,
    /**
     * 插屏广告
     */
    INTERSTITIAL = 1,
    /**
     * 原生广告
     */
    NATIVE = 2,
    /**
     * 激励视频广告
     */
    REWARDED = 3,
    /**
     * 插屏激励视频广告
     */
    REWARDED_INTERSTITIAL = 4,
    /**
     * 开屏广告
     */
    APP_OPEN = 5,
    /**
     * 中等矩形广告
     */
    MREC = 6
}
/**
 * 广告平台
 */
declare enum AdPlatform {
    /**
     * 未授权平台
     */
    UNDISCLOSED = -2,
    /**
     * 未知平台
     */
    UNKNOWN = -1,
    ADMOB = 0,
    MOPUB = 1,
    ADCOLONY = 2,
    APPLOVIN = 3,
    CHARTBOOST = 4,
    FACEBOOK = 5,
    INMOBI = 6,
    IRONSOURCE = 7,
    PANGLE = 8,
    SNAP_AUDIENCE_NETWORK = 9,
    TAPJOY = 10,
    UNITY_ADS = 11,
    VERIZON_MEDIA = 12,
    VUNGLE = 13,
    ADX = 14,
    COMBO = 15,
    BIGO = 16,
    HISAVANA = 17,
    APPLOVIN_EXCHANGE = 18,
    MINTEGRAL = 19,
    LIFTOFF = 20,
    A4G = 21,
    GOOGLE_AD_MANAGER = 22,
    FYBER = 23,
    MAIO = 24,
    CRITEO = 25,
    MYTARGET = 26,
    OGURY = 27,
    APPNEXT = 28,
    KIDOZ = 29,
    SMAATO = 30,
    START_IO = 31,
    VERVE = 32,
    LOVINJOY_ADS = 33,
    YANDEX = 34,
    REKLAMUP = 35
}
/**
 * 聚合广告平台
 */
declare enum AdMediation {
    /**
     * 无聚合平台
     */
    IDLE = -1,
    MOPUB = 0,
    MAX = 1,
    HISAVANA = 2,
    COMBO = 3,
    TOPON = 4,
    TRADPLUS = 5,
    TOBID = 6
}
/**
 * 日志级别
 */
declare enum LogLevel {
    VERBOSE = 1,
    ASSERT = 2,
    DEBUG = 3,
    INFO = 4,
    WARN = 5,
    ERROR = 6
}
/**
 * 传给 native 的初始化配置
 */
interface InitialNativeConfig {
    /**
     * 项目唯一标识，创建项目后 DataTower 后台自动分配，请在【项目设置-项目详情】中获取
     */
    appId: string;
    /**
     * 数据上报地址，创建项目后 DataTower 后台自动分配，请在【项目设置-项目详情】中获取
     */
    serverUrl: string;
    /**
     * 渠道，打多渠道包时需要用到，可使用 SDK 内部提供的实现， 默认为“”
     */
    channel?: string;
    /**
     * 是否打开调试，调试模式下将打印 log， 默认为 false，log 标签为 StaticDataTower
     */
    isDebug?: boolean;
    /**
     * log 的级别，默认为 VERBOSE，仅在 isDebug = true 有效
     */
    logLevel?: LogLevel;
    /**
     * 是否由接入方手动启动上报
     */
    manualEnableUpload?: boolean;
    /**
     * 需要传对应的 SDK type 和 version name
     */
    properties?: {
        '#sdk_type': string;
        '#sdk_version_name': string;
    };
}
/**
 * SDK 内部配置
 */
interface Config extends Required<Omit<InitialNativeConfig, 'properties'>> {
    /**
     * track 时的 debounce 等待时间，默认为 10000ms
     * 手动启动上报时，该值无效
     */
    debounceWait?: number;
    /**
     * 上报队列最大长度，默认为 10
     * 手动启动上报时，该值无效
     */
    maxQueueSize?: number;
}
type PrivateKey = `#${string}` | `$${string}`;
type PublicKey<T extends string> = T extends PrivateKey ? never : T;
type Properties<K extends string> = Record<PublicKey<K>, string | boolean | number>;
interface BaseReportOptions<K extends string> {
    id: string;
    type: AdType;
    platform: AdPlatform;
    mediation: AdMediation;
    mediationId: string;
    seq: string;
    properties: Properties<K>;
}
interface CommonReportOptions {
    location: string;
    entrance: string;
}
interface ReportSuccessOptions<K extends string> {
    sku: string;
    price: number;
    currency: string;
    properties: Properties<K>;
}
interface BaseReportPaidOptions<K extends string> extends BaseReportOptions<K> {
    value: number;
    precision: string;
    location: string;
}
declare global {
    interface Window {
        [key: `__${number}__`]: (arg: any) => void;
    }
}

declare class StaticDataTower {
    protected static instances: Record<string, DataTower>;
    protected static createInstance(): DataTower;
    private static getInstance;
    static initSDK(config: Config): Promise<void>;
    /**
     * manually start the report (if the manualEnableUpload is true)
     */
    static enableUpload(appId?: string): void;
    static track(eventName: string, properties: Record<string, string | boolean | number>, appId?: string): void;
    static userSet<K extends string>(properties: Properties<K>, appId?: string): void;
    static userSetOnce<K extends string>(properties: Properties<K>, appId?: string): void;
    static userAdd<K extends string>(properties: Record<PublicKey<K>, number>, appId?: string): void;
    static userUnset(properties: string[], appId?: string): void;
    static userDelete(appId?: string): void;
    static userAppend<K extends string>(properties: Record<PublicKey<K>, any[]>, appId?: string): void;
    static userUniqAppend<K extends string>(properties: Record<PublicKey<K>, any[]>, appId?: string): void;
    static getDataTowerId(callback: (id: string) => void, appId?: string): void;
    static getDataTowerId(appId?: string): Promise<string>;
    static setAccountId(id: string, appId?: string): void;
    static setFirebaseAppInstanceId(id: string, appId?: string): void;
    static setAppsFlyerId(id: string, appId?: string): void;
    static setKochavaId(id: string, appId?: string): void;
    static setAdjustId(id: string, appId?: string): void;
    static setStaticCommonProperties<K extends string>(properties: Properties<K>, appId?: string): void;
    static clearStaticCommonProperties(appId?: string): void;
    static setCommonProperties(callback: () => Record<string, string | boolean | number>, appId?: string): void;
    static clearCommonProperties(appId?: string): void;
    static trackTimerStart(eventName: string, appId?: string): void;
    static trackTimerPause(eventName: string, appId?: string): void;
    static trackTimerResume(eventName: string, appId?: string): void;
    static trackTimerEnd<K extends string>(eventName: string, properties: Properties<K>, appId?: string): void;
    static reportLoadBegin<K extends string>(opts: BaseReportOptions<K>, appId?: string): void;
    static reportLoadEnd<K extends string>(opts: BaseReportOptions<K> & {
        duration: number;
        result: boolean;
        errorCode: number;
        errorMessage: string;
    }, appId?: string): void;
    static reportToShow<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions, appId?: string): void;
    static reportShow<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions, appId?: string): void;
    static reportShowFailed<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions & {
        errorCode: number;
        errorMessage: string;
    }, appId?: string): void;
    static reportClose<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions, appId?: string): void;
    static reportClick<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions, appId?: string): void;
    static reportRewarded<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions, appId?: string): void;
    static reportConversionByClick<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions, appId?: string): void;
    static reportConversionByLeftApp<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions, appId?: string): void;
    static reportConversionByRewarded<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions, appId?: string): void;
    static reportPaid<K extends string>(opts: BaseReportPaidOptions<K> & {
        country: string;
    }, appId?: string): void;
    static reportPaid<K extends string>(opts: BaseReportPaidOptions<K> & {
        currency: string;
        entrance: string;
    }, appId?: string): void;
    static reportLeftApp<K extends string>(opts: BaseReportOptions<K> & CommonReportOptions, appId?: string): void;
    static reportPurchaseSuccess<K extends string>(opts: ReportSuccessOptions<K> & {
        order: string;
    }, appId?: string): void;
    static reportSubscribeSuccess<K extends string>(opts: ReportSuccessOptions<K> & {
        originalOrderId: string;
        orderId: string;
    }, appId?: string): void;
}
type DataTower = Omit<typeof StaticDataTower, 'prototype'>;

/**
 * cocos platform API
 * includes: android, ios, quick app, mini game, mini program
 */
declare const Cocos: DataTower;

export { AdMediation, AdPlatform, AdType, type BaseReportOptions, type BaseReportPaidOptions, type CommonReportOptions, type Config, Cocos as DataTower, type InitialNativeConfig, LogLevel, type PrivateKey, type Properties, type PublicKey, type ReportSuccessOptions, Cocos as default };
