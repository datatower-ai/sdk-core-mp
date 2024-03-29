import { LogLevel, type InitialNativeConfig } from '@/type';

export const DEFAULT_INITIAL_CONFIG: Required<Omit<InitialNativeConfig, 'properties'>> = {
  appId: '',
  serverUrl: '',
  channel: '',
  isDebug: false,
  logLevel: LogLevel.VERBOSE,
  manualEnableUpload: false,
};

export const AndroidClass = 'ai/datatower/bridge/DTCocosCreatorProxyApi';
export const IOSClass = 'DTCocosCreatorProxyApi';
