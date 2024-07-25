import type { RequestOptions, Shim, SystemInfo } from './type';

export enum QuickGamePlatform {
  OPPO = 'oppo_quick_game',
  VIVO = 'vivo_quick_game',
  HUAWEI = 'huawei_quick_game',
  XIAOMI = 'xiaomi_quick_game',
  MEIZU = 'meizu_quick_game',
}
/**
 * TODO:
 * quick game shim
 */
export class QuickGameShim implements Shim {
  constructor(private platform: QuickGamePlatform) {}
  get referrer(): string {
    throw new Error('Method not implemented.');
  }
  get href(): string {
    throw new Error('Method not implemented.');
  }
  getStorage<T = unknown>(key: string): Promise<T | null> {
    throw new Error('Method not implemented.');
  }
  setStorage<T>(key: string, value: T): Promise<void> {
    throw new Error('Method not implemented.');
  }
  removeStorage(name: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  get systemInfo(): SystemInfo {
    throw new Error('Method not implemented.');
  }
  get userAgent(): string {
    throw new Error('Method not implemented.');
  }
  async request(options: RequestOptions): Promise<void> {
    throw new Error('Unsupported platform');
  }
}
