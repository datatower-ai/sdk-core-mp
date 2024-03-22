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
interface DataTower {
    init(config: Config): void;
    enableTrack(): void;
    track(eventName: string, properties?: Record<string, any>): void;
    userSet(properties: Record<string, any>): void;
    userSetOnce(properties: Record<string, any>): void;
    userAdd(properties: Record<string, any>): void;
    userUnset(...properties: string[]): void;
    userDel(): void;
    userAppend(...properties: string[]): void;
    userUniqAppend(...properties: string[]): void;
    getDataTowerId(callback: (id: string) => void): void;
    getDataTowerId(): Promise<string>;
    setAccountId(id: string): void;
    setDistinctId(id: string): void;
    getDistinctId(): string | null | void;
    setFirebaseAppInstanceId(id: string): void;
    setAppsFlyerId(id: string): void;
    setKochavaId(id: string): void;
    setAdjustId(id: string): void;
    setCommonProperties(properties: Record<string, any>): void;
    clearCommonProperties(): void;
    setStaticCommonProperties(properties: Record<string, any>): void;
    clearStaticCommonProperties(): void;
}
declare global {
    interface Window {
        DataTower: DataTower;
    }
}

/**
 * cocos creator platform API
 * includes android/ios, quick app and mini game/program
 */
declare function init(config: Config): void;
declare function track(eventName: string, properties?: Record<string, any>): void;
declare function enableTrack(): void;
declare function userSet(properties: Record<string, any>): void;
declare function userSetOnce(properties: Record<string, any>): void;
declare function userAdd(properties: Record<string, any>): void;
declare function userUnset(...properties: string[]): void;
declare function userDel(): void;
declare function userAppend(...properties: string[]): void;
declare function userUniqAppend(...properties: string[]): void;
declare function getDataTowerId(callback: (id: string) => void): void;
declare function getDataTowerId(): Promise<string>;
declare function setAccountId(id: string): void;
declare function setDistinctId(id: string): void;
declare function getDistinctId(): string | void | null;
declare function setFirebaseAppInstanceId(id: string): void;
declare function setAppsFlyerId(id: string): void;
declare function setKochavaId(id: string): void;
declare function setAdjustId(id: string): void;
declare function setCommonProperties(properties: Record<string, any>): void;
declare function clearCommonProperties(): void;
declare function setStaticCommonProperties(properties: Record<string, any>): void;
declare function clearStaticCommonProperties(): void;

export { type Config, type Context, type DataTower, LogLevel, clearCommonProperties, clearStaticCommonProperties, enableTrack, getDataTowerId, getDistinctId, init, setAccountId, setAdjustId, setAppsFlyerId, setCommonProperties, setDistinctId, setFirebaseAppInstanceId, setKochavaId, setStaticCommonProperties, track, userAdd, userAppend, userDel, userSet, userSetOnce, userUniqAppend, userUnset };
