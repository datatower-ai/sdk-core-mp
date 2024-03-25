export * from '../type';
import type { DT } from '../DataTower';
// TODO: 在编译期区分平台
// #if NATIVE_ANDROID
// export * from './Android.js';
// #elif NATIVE_IOS
// export * from './IOS.js';
// #else

// 在运行时区分平台
import Web from '../Web/index';
import Android from './Android';
import IOS from './IOS';

/**
 * cocos creator platform API
 * includes android/ios, quick app and mini game/program
 */
const CocosCreator: DT = (<const>[
  [cc.sys.platform == cc.sys.Platform.ANDROID, Android],
  [cc.sys.platform == cc.sys.Platform.IOS, IOS],
  [true, Web],
]).find((item) => item[0])![1];

export { CocosCreator as DataTower };
export default CocosCreator;
// #endif
