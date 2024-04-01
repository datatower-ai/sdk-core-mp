/**
 * @file type.ts
 * 该文件下的类型是需要导出给用户使用的类型
 * 内部使用的类型不应写在该文件下
 */

/**
 * 日志级别
 */
export enum LogLevel {
  VERBOSE = 1,
  ASSERT = 2,
  DEBUG = 3,
  INFO = 4,
  WARN = 5,
  ERROR = 6,
}

/**
 * 传给 native 的初始化配置
 */
export interface InitialNativeConfig {
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

export interface Config extends Required<Omit<InitialNativeConfig, 'properties'>> {
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

/**
 * 请求参数
 */
export interface RequestOptions {
  url: string;
  data: string;
}

declare global {
  interface Window {
    [key: `__${number}__`]: (arg: any) => void;
  }
}
