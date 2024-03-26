import { LogLevel, type Config } from './type';

export const DefaultConfig: Config = {
  appId: '',
  serverUrl: '',
  channel: '',
  isDebug: false,
  logLevel: LogLevel.VERBOSE,
  manualEnableUpload: false,
  commonProperties: void 0,
};

export const AndroidClass = 'ai/datatower/bridge/DTCocosCreatorProxyApi';
export const IOSClass = 'DTCocosCreatorProxyApi';
