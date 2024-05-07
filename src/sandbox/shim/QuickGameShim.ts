import type { RequestOptions, Shim, SystemInfo } from './type';

export enum QuickGamePlatform {
  OPPO = 'OPPO_QUICK_GAME',
  VIVO = 'VIVO_QUICK_GAME',
  HUAWEI = 'HUAWEI_QUICK_GAME',
  XIAOMI = 'XIAOMI_QUICK_GAME',
  MEIZU = 'MEIZU_QUICK_GAME',
}
/**
 * TODO:
 * quick game shim
 */
export class QuickGameShim implements Shim {
  constructor(private platform: QuickGamePlatform) {}
  getReferrer(): string {
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
  getSystemInfo(): SystemInfo {
    throw new Error('Method not implemented.');
  }
  getUserAgent(): string {
    throw new Error('Method not implemented.');
  }
  async request(options: RequestOptions): Promise<void> {
    throw new Error('Unsupported platform');
  }
}
