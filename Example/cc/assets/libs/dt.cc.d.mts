declare enum LogLevel {
    VERBOSE = 1,
    ASSERT = 2,
    DEBUG = 3,
    INFO = 4,
    WARN = 5,
    ERROR = 6
}
interface Config {
    /**
     * 项目唯一标识，创建项目后 DT 后台自动分配，请在【项目设置-项目详情】中获取
     */
    appId: string;
    /**
     * 数据上报地址，创建项目后 DT 后台自动分配，请在【项目设置-项目详情】中获取
     */
    serverUrl: string;
    /**
     * 渠道，打多渠道包时需要用到，可使用 SDK 内部提供的实现， 默认为“”
     */
    channel?: string;
    /**
     * 是否打开调试，调试模式下将打印 log， 默认为 false，log 标签为 DataTower
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
declare global {
    interface Window {
        [key: `__${number}__`]: (arg: any) => void;
    }
}

declare class DataTower {
    static instance: Omit<typeof DataTower, 'instance' | 'prototype'>;
    static init(config: Config): void;
    static enableUpload(): void;
    static track(eventName: string, properties?: Record<string, any>): void;
    static userSet(properties: Record<string, any>): void;
    static userSetOnce(properties: Record<string, any>): void;
    static userAdd(properties: Record<string, any>): void;
    static userUnset(properties: string[]): void;
    static userDelete(): void;
    static userAppend(properties: Record<string, any>): void;
    static userUniqAppend(properties: Record<string, any>): void;
    static getDataTowerId(callback: (id: string) => void): void;
    static getDataTowerId(): Promise<string>;
    static setAccountId(id: string): void;
    static setDistinctId(id: string): void;
    static getDistinctId(callback: (id: string) => void): void;
    static getDistinctId(): Promise<string>;
    static setFirebaseAppInstanceId(id: string): void;
    static setAppsFlyerId(id: string): void;
    static setKochavaId(id: string): void;
    static setAdjustId(id: string): void;
    static setCommonProperties(properties: Record<string, any>): void;
    static clearCommonProperties(): void;
    static setStaticCommonProperties(properties: Record<string, any>): void;
    static clearStaticCommonProperties(): void;
}
type DT = typeof DataTower & {
    new (): Omit<typeof DataTower, 'instance' | 'prototype'>;
};

/**
 * cocos creator platform API
 * includes android/ios, quick app and mini game/program
 */
declare const CocosCreator: DT;

export { type Config, CocosCreator as DataTower, LogLevel, CocosCreator as default };
