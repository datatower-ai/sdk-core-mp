import type { Config, InitialNativeConfig } from '@/type';
import { LogLevel } from './Logger';

export const DEFAULT_INITIAL_CONFIG: Required<Omit<InitialNativeConfig, 'properties'>> = {
  token: '',
  app_id: '',
  server_url: '',
  channel: '',
  isDebug: false,
  logLevel: LogLevel.VERBOSE,
  manualEnableUpload: false,
};

export const DEFAULT_CONFIG: Required<Config> = {
  ...DEFAULT_INITIAL_CONFIG,
  maxQueueSize: 10,
  throttleWait: 1000,
};

/** 广告类型 */
export const enum AdType {
  /** 未知类型 */
  UNKNOWN = -1,
  /** 横幅广告 */
  BANNER = 0,
  /** 插屏广告 */
  INTERSTITIAL = 1,
  /** 原生广告 */
  NATIVE = 2,
  /** 激励视频广告 */
  REWARDED = 3,
  /** 插屏激励视频广告 */
  REWARDED_INTERSTITIAL = 4,
  /** 开屏广告 */
  APP_OPEN = 5,
  /** 中等矩形广告 */
  MREC = 6,
}

/** 广告平台 */
export const enum AdPlatform {
  /** 未授权平台 */
  UNDISCLOSED = -2,
  /** 未知平台 */
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
  REKLAMUP = 35,
}

/** 聚合广告平台 */
export const enum AdMediation {
  /** 无聚合平台 */
  IDLE = -1,
  MOPUB = 0,
  MAX = 1,
  HISAVANA = 2,
  COMBO = 3,
  TOPON = 4,
  TRADPLUS = 5,
  TOBID = 6,
}
