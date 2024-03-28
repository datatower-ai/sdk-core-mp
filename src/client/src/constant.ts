import { LogLevel, type Config } from './type';

export const DefaultConfig: Required<Config> = {
  appId: '',
  serverUrl: '',
  channel: '',
  isDebug: false,
  logLevel: LogLevel.VERBOSE,
  manualEnableUpload: false,
  properties: { '#sdk_type': '', '#sdk_version_name': '' },
};

export const AndroidClass = 'ai/datatower/bridge/DTCocosCreatorProxyApi';
export const IOSClass = 'DTCocosCreatorProxyApi';
