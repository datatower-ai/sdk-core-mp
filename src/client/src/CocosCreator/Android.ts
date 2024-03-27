import { DataTower } from '../DataTower';
import { AndroidClass, DefaultConfig } from '../constant';
import type { Config } from '../type';
import { fmt, generateSignature, globalNativeCallback, type GenerateSignatureParams } from '../utils';

/**
 * cocos creator Android bridge
 */
class Android extends DataTower {
  static instance = new Android();
  private config: Config = DefaultConfig;
  constructor(config?: Config) {
    super();
    if (config) this.init(config);
  }

  private callStaticMethod(method: string, signature: GenerateSignatureParams, ...args: any[]): any {
    return jsb.reflection.callStaticMethod(AndroidClass, method, generateSignature(signature), ...args);
  }

  init(config: Config): void {
    this.config = Object.assign({}, DefaultConfig, config);
    this.callStaticMethod('initSDK', [['String'], 'void'], fmt(this.config));
  }
  track(eventName: string, properties: Record<string, any>): void {
    this.callStaticMethod('track', [['String', 'String'], 'void'], eventName, fmt(properties));
  }
  enableUpload(): void {
    this.callStaticMethod('enableUpload', [[], 'void']);
  }
  userSet(properties: Record<string, any>): void {
    this.callStaticMethod('userSet', [['String'], 'void'], fmt(properties));
  }
  userSetOnce(properties: Record<string, any>): void {
    this.callStaticMethod('userSetOnce', [['String'], 'void'], fmt(properties));
  }
  userAdd(properties: Record<string, any>): void {
    this.callStaticMethod('userAdd', [['String'], 'void'], fmt(properties));
  }
  // TODO:
  userUnset(properties: string[]): void {
    this.callStaticMethod('userUnset', [['String'], 'void'], fmt(properties));
  }
  userDelete(): void {
    this.callStaticMethod('userDelete', [[], 'void']);
  }
  userAppend(properties: Record<string, any>): void {
    this.callStaticMethod('userAppend', [['String'], 'void'], fmt(properties));
  }
  userUniqAppend(properties: Record<string, any>): void {
    this.callStaticMethod('userUniqAppend', [['String'], 'void'], fmt(properties));
  }
  // TODO:
  getDataTowerId(callback: (id: string) => void): void;
  getDataTowerId(): Promise<string>;
  getDataTowerId(callback?: (id: string) => void): void | Promise<string> {
    if (!callback) return new Promise((resolve) => this.getDataTowerId(resolve));
    globalNativeCallback((cb) => this.callStaticMethod('getDataTowerId', [['String'], 'void'], cb), callback);
  }
  setAccountId(id: string): void {
    this.callStaticMethod('setAccountId', [['String'], 'void'], id);
  }
  setDistinctId(id: string): void {
    this.callStaticMethod('setDistinctId', [['String'], 'void'], id);
  }
  // TODO:
  getDistinctId(callback: (id: string) => void): void;
  getDistinctId(): Promise<string>;
  getDistinctId(callback?: (id: string) => void): void | Promise<string> {
    if (!callback) return new Promise((resolve) => this.getDistinctId(resolve));
    globalNativeCallback((cb) => this.callStaticMethod('getDistinctId', [['String'], 'void'], cb), callback);
  }
  setFirebaseAppInstanceId(id: string): void {
    this.callStaticMethod('setFirebaseAppInstanceId', [['String'], 'void'], id);
  }
  setAppsFlyerId(id: string): void {
    this.callStaticMethod('setAppsFlyerId', [['String'], 'void'], id);
  }
  setKochavaId(id: string): void {
    this.callStaticMethod('setKochavaId', [['String'], 'void'], id);
  }
  setAdjustId(id: string): void {
    this.callStaticMethod('setAdjustId', [['String'], 'void'], id);
  }
  setCommonProperties(properties: Record<string, any>): void {
    this.callStaticMethod('setCommonProperties', [['String'], 'void'], fmt(properties));
  }
  clearCommonProperties(): void {
    this.callStaticMethod('clearCommonProperties', [[], 'void']);
  }
  setStaticCommonProperties(properties: Record<string, any>): void {
    this.callStaticMethod('setStaticCommonProperties', [['String'], 'void'], fmt(properties));
  }
  clearStaticCommonProperties(): void {
    this.callStaticMethod('clearStaticCommonProperties', [[], 'void']);
  }
}

export { Android as DataTower };
export default Android;
