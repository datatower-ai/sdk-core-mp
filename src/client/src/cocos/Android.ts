import { version } from '@/package.json';
import { StaticDataTower } from '@/src/StaticDataTower';
import { AndroidClass, DEFAULT_INITIAL_CONFIG } from '@/src/constant';
import type { Config, PublicKey } from '@/src/type';
import { fmt, globalNativeCallback } from '@/src/utils';

type JavaType = 'void' | 'int' | 'float' | 'boolean' | 'String';
type Signature = [args: JavaType[], ret: JavaType];

/**
 * cocos CocosAndroid bridge
 */
export class CocosAndroid extends StaticDataTower {
  protected static instance = new CocosAndroid();
  private staticProperties = { '#sdk_type': 'js', '#sdk_version_name': version };
  private dynamicProperties: null | (() => Record<string, string | boolean | number>) = null;

  private static typeMap: Record<JavaType, string> = {
    void: 'V',
    int: 'I',
    float: 'F',
    boolean: 'Z',
    String: 'Ljava/lang/String;',
  };
  private static generateSignature([args, ret]: Signature): string | void {
    return `(${args.map((arg) => this.typeMap[arg]).join('')})${this.typeMap[ret]}`;
  }
  private static callStaticMethod(method: string, signature: Signature, ...args: any[]): any {
    return globalThis.jsb.reflection.callStaticMethod(AndroidClass, method, this.generateSignature(signature), ...args);
  }

  async init(config: Config): Promise<void> {
    config = Object.assign({}, DEFAULT_INITIAL_CONFIG, config, { properties: this.staticProperties });
    CocosAndroid.callStaticMethod('initSDK', [['String'], 'void'], fmt(config));
  }
  track(eventName: string, properties: Record<string, string | boolean | number>): void {
    properties = { ...properties, ...this.dynamicProperties?.() };
    CocosAndroid.callStaticMethod('track', [['String', 'String'], 'void'], eventName, fmt(properties));
  }
  enableUpload(): void {
    CocosAndroid.callStaticMethod('enableUpload', [[], 'void']);
  }
  userSet<K extends string>(properties: Record<PublicKey<K>, string | boolean | number>): void {
    CocosAndroid.callStaticMethod('userSet', [['String'], 'void'], fmt(properties));
  }
  userSetOnce<K extends string>(properties: Record<PublicKey<K>, string | boolean | number>): void {
    CocosAndroid.callStaticMethod('userSetOnce', [['String'], 'void'], fmt(properties));
  }
  userAdd<K extends string>(properties: Record<PublicKey<K>, number>): void {
    CocosAndroid.callStaticMethod('userAdd', [['String'], 'void'], fmt(properties));
  }
  userUnset(properties: string[]): void {
    CocosAndroid.callStaticMethod('userUnset', [['String'], 'void'], fmt(properties));
  }
  userDelete(): void {
    CocosAndroid.callStaticMethod('userDelete', [[], 'void']);
  }
  userAppend<K extends string>(properties: Record<PublicKey<K>, any[]>): void {
    CocosAndroid.callStaticMethod('userAppend', [['String'], 'void'], fmt(properties));
  }
  userUniqAppend<K extends string>(properties: Record<PublicKey<K>, any[]>): void {
    CocosAndroid.callStaticMethod('userUniqAppend', [['String'], 'void'], fmt(properties));
  }
  getDataTowerId(callback: (id: string) => void): void;
  getDataTowerId(): Promise<string>;
  getDataTowerId(callback?: (id: string) => void): void | Promise<string> {
    if (!callback) return new Promise((resolve) => this.getDataTowerId(resolve));
    globalNativeCallback((cb) => CocosAndroid.callStaticMethod('getDataTowerId', [['String'], 'void'], cb), callback);
  }
  getDistinctId(callback: (id: string) => void): void;
  getDistinctId(): Promise<string>;
  getDistinctId(callback?: (id: string) => void): void | Promise<string> {
    if (!callback) return new Promise((resolve) => this.getDistinctId(resolve));
    globalNativeCallback((cb) => CocosAndroid.callStaticMethod('getDistinctId', [['String'], 'void'], cb), callback);
  }
  setAccountId(id: string): void {
    CocosAndroid.callStaticMethod('setAccountId', [['String'], 'void'], id);
  }
  setDistinctId(id: string): void {
    CocosAndroid.callStaticMethod('setDistinctId', [['String'], 'void'], id);
  }
  setFirebaseAppInstanceId(id: string): void {
    CocosAndroid.callStaticMethod('setFirebaseAppInstanceId', [['String'], 'void'], id);
  }
  setAppsFlyerId(id: string): void {
    CocosAndroid.callStaticMethod('setAppsFlyerId', [['String'], 'void'], id);
  }
  setKochavaId(id: string): void {
    CocosAndroid.callStaticMethod('setKochavaId', [['String'], 'void'], id);
  }
  setAdjustId(id: string): void {
    CocosAndroid.callStaticMethod('setAdjustId', [['String'], 'void'], id);
  }
  setStaticCommonProperties<K extends string>(properties: Record<PublicKey<K>, string | boolean | number>): void {
    CocosAndroid.callStaticMethod('setStaticCommonProperties', [['String'], 'void'], fmt(properties));
  }
  clearStaticCommonProperties(): void {
    CocosAndroid.callStaticMethod('clearStaticCommonProperties', [[], 'void']);
  }
  setCommonProperties(callback: () => Record<string, string | boolean | number>): void {
    this.dynamicProperties = callback;
  }
  clearCommonProperties(): void {
    this.dynamicProperties = null;
  }
}

export { CocosAndroid as StaticDataTower };
export default CocosAndroid;
