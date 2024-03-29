import type { RequestOptions } from '@/type';

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
export class QuickGameShim {
  constructor(private platform: QuickGamePlatform) {}
  async request(options: RequestOptions): Promise<void> {
    throw new Error('Unsupported platform');
  }
}
