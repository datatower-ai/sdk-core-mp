import type { RequestOptions } from '@/type';

/**
 * TODO:
 * quick app shim
 */
export class QuickAppShim {
  async request(options: RequestOptions): Promise<void> {
    throw new Error('Unsupported platform');
  }
}
