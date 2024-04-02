import { Config, LogLevel, type InitialNativeConfig } from '@/src/type';

export const DEFAULT_INITIAL_CONFIG: Required<Omit<InitialNativeConfig, 'properties'>> = {
  appId: '',
  serverUrl: '',
  channel: '',
  isDebug: false,
  logLevel: LogLevel.VERBOSE,
  manualEnableUpload: false,
};

export const DEFAULT_CONFIG: Required<Config> = {
  ...DEFAULT_INITIAL_CONFIG,
  maxQueueSize: 10,
  debounceWait: 1000,
};

export const AndroidClass = 'ai/datatower/bridge/DTCocosCreatorProxyApi';
export const IOSClass = 'DTCocosCreatorProxyApi';
