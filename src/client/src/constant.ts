import type { Config } from './type';

export const DefaultConfig: Config = {
  context: {},
  appId: '',
  serverUrl: '',
  channel: '',
  isDebug: true,
  logLevel: 1,
  manualEnableUpload: false,
  commonProperties: {},
};

export const AndroidClass = 'com/ai/datatower/DTCocosCreatorProxyApi';
export const IOSClass = 'DTCocosCreatorProxyApi';
