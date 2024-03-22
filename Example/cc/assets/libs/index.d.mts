interface Context {
}
declare enum LogLevel {
    VERBOSE = 1,
    ASSERT = 2,
    DEBUG = 3,
    INFO = 4,
    WARN = 5,
    ERROR = 6
}
interface Config {
    context: Context;
    appId: string;
    serverUrl: string;
    channel: string;
    isDebug: boolean;
    logLevel: LogLevel;
    manualEnableUpload: boolean;
    commonProperties: Record<string, any>;
}

declare class DataTower {
    #private;
    static init(config: Config): void;
    static enableTrack(): void;
    static track(eventName: string, properties?: Record<string, any>): void;
    static userSet(properties: Record<string, any>): void;
    static userSetOnce(properties: Record<string, any>): void;
    static userAdd(properties: Record<string, any>): void;
    static userUnset(...properties: string[]): void;
    static userDel(): void;
    static userAppend(...properties: string[]): void;
    static userUniqAppend(...properties: string[]): void;
    static getDataTowerId(callback: (id: string) => void): void;
    static getDataTowerId(): Promise<string>;
    static setAccountId(id: string): void;
    static setDistinctId(id: string): void;
    static getDistinctId(): string | null | void;
    static setFirebaseAppInstanceId(id: string): void;
    static setAppsFlyerId(id: string): void;
    static setKochavaId(id: string): void;
    static setAdjustId(id: string): void;
    static setCommonProperties(properties: Record<string, any>): void;
    static clearCommonProperties(): void;
    static setStaticCommonProperties(properties: Record<string, any>): void;
    static clearStaticCommonProperties(): void;
}

/**
 * cocos creator platform API
 * includes android/ios, quick app and mini game/program
 */
declare const CocosCreator: typeof DataTower & {
    new (config?: Config): DataTower;
};

export { CocosCreator, type Config, type Context, CocosCreator as DataTower, LogLevel, CocosCreator as default };
