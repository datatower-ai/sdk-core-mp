export interface Context {
  /* TODO: */
}

export enum LogLevel {
  VERBOSE = 1,
  ASSERT = 2,
  DEBUG = 3,
  INFO = 4,
  WARN = 5,
  ERROR = 6,
}

export interface Config {
  context: Context; // Context 上下文
  appId: string; // 项目唯一标识，创建项目后 DT 后台自动分配，请在【项目设置-项目详情】中获取
  serverUrl: string; // 数据上报地址，创建项目后 DT 后台自动分配，请在【项目设置-项目详情】中获取
  channel: string; // 渠道，打多渠道包时需要用到，可使用 SDK 内部提供的实现， 默认为“”
  isDebug: boolean; // 是否打开调试，调试模式下将打印 log， 默认为 false，log 标签为 DataTower
  logLevel: LogLevel; // log 的级别，默认为 VERBOSE，仅在 isDebug = true 有效
  manualEnableUpload: boolean; // 是否由接入方手动启动上报
  commonProperties: Record<string, any>;
}

export interface DataTower {
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
  getDataTowerId(callback: (id: string) => void): void; // 异步获取 dt_id
  getDataTowerId(): Promise<string>; // 异步获取 dt_id
  setAccountId(id: string): void; // 设置 acid（空字符串则对应 logout）
  setDistinctId(id: string): void; // 设置访客 id
  getDistinctId(): string | null | void; // 获取访客 id
  setFirebaseAppInstanceId(id: string): void;
  setAppsFlyerId(id: string): void;
  setKochavaId(id: string): void;
  setAdjustId(id: string): void;
  setCommonProperties(properties: Record<string, any>): void; // 设置动态公共属性
  clearCommonProperties(): void; // 清除动态公共属性
  setStaticCommonProperties(properties: Record<string, any>): void; // 设置静态公共属性
  clearStaticCommonProperties(): void; // 清除静态公共属性
}

declare global {
  interface Window {
    DataTower: DataTower;
  }
}
declare var DataTower: DataTower;
