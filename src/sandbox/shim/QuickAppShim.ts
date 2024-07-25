import type { RequestOptions, Shim, SystemInfo } from './type';

/**
 * TODO:
 * quick app shim
 */
export class QuickAppShim implements Shim {
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
