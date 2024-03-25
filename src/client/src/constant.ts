import type { Config } from './type';

export const DefaultConfig: Config = {
  context: {},
  appId: '',
  serverUrl: '',
  channel: '',
  isDebug: false,
  logLevel: 1,
  manualEnableUpload: false,
  commonProperties: {},
};

export const AndroidClass = 'ai/datatower/analytics/DT';
export const IOSClass = 'DTCocosCreatorProxyApi';
