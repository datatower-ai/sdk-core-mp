import { DataTower } from '../DataTower';
import { AndroidClass, DefaultConfig } from '../constant';
import type { Config } from '../type';
import { format, generateSignature, type GenerateSignatureParams } from '../utils';

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
    this.callStaticMethod('initSDK', [['String'], 'void'], format(this.config));
  }
  track(eventName: string, properties: Record<string, any>): void {
    this.callStaticMethod('track', [['String', 'String'], 'void'], eventName, format(properties));
  }
  enableTrack(): void {
    this.callStaticMethod('enableTrack', [[], 'void']);
  }
  userSet(properties: Record<string, any>): void {
    this.callStaticMethod('userSet', [['String'], 'void'], format(properties));
  }
  userSetOnce(properties: Record<string, any>): void {
    this.callStaticMethod('userSetOnce', [['String'], 'void'], format(properties));
  }
  userAdd(properties: Record<string, any>): void {
    this.callStaticMethod('userAdd', [['String'], 'void'], format(properties));
  }
  userUnset(...properties: string[]): void {
    this.callStaticMethod('userUnset', [['String'], 'void'], format(properties));
  }
  userDel(): void {
    this.callStaticMethod('userDel', [[], 'void']);
  }
  userAppend(...properties: string[]): void {
    this.callStaticMethod('userAppend', [['String'], 'void'], format(properties));
  }
  userUniqAppend(...properties: string[]): void {
    this.callStaticMethod('userUniqAppend', [['String'], 'void'], format(properties));
  }
  getDataTowerId(callback: (id: string) => void): void;
  getDataTowerId(): Promise<string>;
  getDataTowerId(callback?: (id: string) => void): void | Promise<string> {
    if (!callback) return new Promise((resolve) => this.getDataTowerId(resolve));
    this.callStaticMethod('getDataTowerId', [[], 'void'], callback);
  }
  setAccountId(id: string): void {
    this.callStaticMethod('setAccountId', [['String'], 'void'], id);
  }
  setDistinctId(id: string): void {
    this.callStaticMethod('setDistinctId', [['String'], 'void'], id);
  }
  getDistinctId(callback: (id: string) => void): void;
  getDistinctId(): Promise<string>;
  getDistinctId(callback?: (id: string) => void): void | Promise<string> {
    if (!callback) return new Promise((resolve) => this.getDistinctId(resolve));
    this.callStaticMethod('getDistinctId', [[], 'void'], callback);
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
    this.callStaticMethod('setCommonProperties', [['String'], 'void'], format(properties));
  }
  clearCommonProperties(): void {
    this.callStaticMethod('clearCommonProperties', [[], 'void']);
  }
  setStaticCommonProperties(properties: Record<string, any>): void {
    this.callStaticMethod('setStaticCommonProperties', [['String'], 'void'], format(properties));
  }
  clearStaticCommonProperties(): void {
    this.callStaticMethod('clearStaticCommonProperties', [[], 'void']);
  }
}

export { Android as DataTower };
export default Android;
