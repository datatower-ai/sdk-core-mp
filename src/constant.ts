import { Config, LogLevel, type InitialNativeConfig } from '@/type';

export const DEFAULT_INITIAL_CONFIG: Required<Omit<InitialNativeConfig, 'properties'>> = {
  app_id: '',
  server_url: '',
  channel: '',
  isDebug: false,
  logLevel: LogLevel.VERBOSE,
  manualEnableUpload: false,
};

export const DEFAULT_CONFIG: Required<Config> = {
  ...DEFAULT_INITIAL_CONFIG,
  token: '',
  maxQueueSize: 10,
  debounceWait: 1000,
};

export const AndroidClass = 'ai/datatower/bridge/DTCocosCreatorProxyApi';
export const IOSClass = 'DTCocosCreatorProxyApi';
