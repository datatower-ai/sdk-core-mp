import type { AdMediation, AdPlatform, AdType } from './constant';
import type { LogLevel } from './Logger';

/** 传给 native 的初始化配置 */
export type InitialNativeConfig = {
  /** js sdk上报的token */
  token: string;
  /** 项目唯一标识，创建项目后 DataTower 后台自动分配，请在【项目设置-项目详情】中获取 */
  app_id: string;
  /** 数据上报地址，创建项目后 DataTower 后台自动分配，请在【项目设置-项目详情】中获取 */
  server_url: string;
  /** 渠道，打多渠道包时需要用到，可使用 SDK 内部提供的实现， 默认为“” */
  channel?: string;
  /** 是否打开调试，调试模式下将打印 log， 默认为 false，log 标签为 DataTower */
  isDebug?: boolean;
  /** log 的级别，默认为 VERBOSE，仅在 isDebug = true 有效 */
  logLevel?: LogLevel;
  /** 是否由接入方手动启动上报 */
  manualEnableUpload?: boolean;
  /** 需要传对应的 SDK type 和 version name */
  properties?: {
    '#sdk_type': string;
    '#sdk_version_name': string;
  };
};

/** SDK 内部配置，暴露到外部，由 init 传入 */
export type Config = Omit<InitialNativeConfig, 'properties'> & {
  /**
   * 防抖延迟时间，默认1000ms，作用是将连续触发上报的多个事件合并到一个请求中。
   * 手动启动上报时，该值无效
   */
  debounceWait?: number;
  /**
   * 上报队列最大长度，默认为 10。
   * 手动启动上报时，该值无效
   */
  maxQueueSize?: number;
};

export type Properties = Record<string, string | boolean | number>;

export type ArrayProperties = Record<string, (string | boolean | number)[]>;

/* key 以 '#'或'$' 开头，则返回 never */
export type ExcludePrivateKey<T extends Record<string, any>> = {
  [K in keyof T]: K extends `#${string}` | `$${string}` ? never : T[K];
};

export type BaseReportOptions = {
  id: string;
  type: AdType;
  platform: AdPlatform;
  mediation: AdMediation;
  mediationId: string;
  seq: string;
  properties: Properties;
};

export type CommonReportOptions = {
  location: string;
  entrance: string;
};

export type ReportSuccessOptions = {
  sku: string;
  price: number;
  currency: string;
  properties: Properties;
};

export type BaseReportPaidOptions = BaseReportOptions & {
  value: number;
  precision: string;
  location: string;
};

declare global {
  interface Window {
    [key: `__${number}__`]: (arg: any) => void;
  }
}
