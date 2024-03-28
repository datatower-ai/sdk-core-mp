export enum QuickGamePlatform {
  OPPO = 300,
  VIVO,
  HUAWEI,
  XIAOMI,
  MEIZU,
}
/**
 * TODO:
 * quick game shim
 */
export class QuickGameShim {
  constructor(private platform: QuickGamePlatform) {}
}
