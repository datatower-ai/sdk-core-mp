export * from '../type';
import type { DataTower } from '../DataTower';
// TODO: 在编译期区分平台
// #if NATIVE_ANDROID
// export * from './Android.js';
// #elif NATIVE_IOS
// export * from './IOS.js';
// #else

// 在运行时区分平台
import { Web } from '../sandbox/index';
import Android from './Android';
import IOS from './IOS';

/**
 * cocos platform API
 * includes android/ios, quick app and mini game/program
 */
const Cocos: typeof DataTower =
  {
    [globalThis.cc.sys.Platform.ANDROID]: Android,
    [globalThis.cc.sys.Platform.IOS]: IOS,
  }[globalThis.cc.sys.platform] || Web;

export { Cocos as DataTower };
export default Cocos;
// #endif
