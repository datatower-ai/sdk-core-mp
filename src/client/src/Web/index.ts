import { DataTower } from '../DataTower';
import { DefaultConfig } from '../constant';
import type { Config } from '../type';
import { logger } from '../utils';
export * from '../type';

const CurrentPlatform: any = new Proxy(
  {},
  {
    get(target, key: string) {
      return (...args: any[]) => {
        const params = args.map((arg) => (typeof arg === 'function' ? arg.toString() : JSON.stringify(arg))).join(', ');
        console.log(`${key}(${params})`);
      };
    },
  },
);

// TODO: 待实现
class Web extends DataTower {
  static instance = new Web();
  constructor(config?: Config) {
    super();
    if (config) this.init(config);
  }
  init(config: Config) {
    config = Object.assign({}, DefaultConfig, config);
    if (config.isDebug) return logger('Web', 'init', config);
    CurrentPlatform.init(config);
  }
  track(eventName: string, properties?: Record<string, any>): void {
    CurrentPlatform.track(eventName, properties);
  }
  enableTrack(): void {
    CurrentPlatform.enableTrack();
  }
  userSet(properties: Record<string, any>): void {
    CurrentPlatform.userSet(properties);
  }
  userSetOnce(properties: Record<string, any>): void {
    CurrentPlatform.userSetOnce(properties);
  }
  userAdd(properties: Record<string, any>): void {
    CurrentPlatform.userAdd(properties);
  }
  userUnset(...properties: string[]): void {
    CurrentPlatform.userUnset(...properties);
  }
  userDel(): void {
    CurrentPlatform.userDel();
  }
  userAppend(...properties: string[]): void {
    CurrentPlatform.userAppend(...properties);
  }
  userUniqAppend(...properties: string[]): void {
    CurrentPlatform.userUniqAppend(...properties);
  }
  getDataTowerId(callback: (id: string) => void): void;
  getDataTowerId(): Promise<string>;
  getDataTowerId(callback?: (id: string) => void): void | Promise<string> {
    CurrentPlatform.getDataTowerId(callback);
    if (!callback) return Promise.resolve('data tower id');
    callback('data tower id');
  }
  setAccountId(id: string): void {
    CurrentPlatform.setAccountId(id);
  }
  setDistinctId(id: string): void {
    CurrentPlatform.setDistinctId(id);
  }
  getDistinctId(): string | void | null {
    return CurrentPlatform.getDistinctId();
  }
  setFirebaseAppInstanceId(id: string): void {
    CurrentPlatform.setFirebaseAppInstanceId(id);
  }
  setAppsFlyerId(id: string): void {
    CurrentPlatform.setAppsFlyerId(id);
  }
  setKochavaId(id: string): void {
    CurrentPlatform.setKochavaId(id);
  }
  setAdjustId(id: string): void {
    CurrentPlatform.setAdjustId(id);
  }
  setCommonProperties(properties: Record<string, any>): void {
    CurrentPlatform.setCommonProperties(properties);
  }
  clearCommonProperties(): void {
    CurrentPlatform.clearCommonProperties();
  }
  setStaticCommonProperties(properties: Record<string, any>): void {
    CurrentPlatform.setStaticCommonProperties(properties);
  }
  clearStaticCommonProperties(): void {
    CurrentPlatform.clearStaticCommonProperties();
  }
}

export { Web as DataTower };
export default Web;
