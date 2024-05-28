export * from '@/src/type';
import type { AnalysisDataTower } from '@/src/StaticDataTower';
import { Web } from '@/src/sandbox/index';
import { CocosAndroid } from './Android';
import { CocosIOS } from './IOS';

/**
 * cocos platform API
 * includes: android, ios, quick app, mini game, mini program
 */
const Cocos: AnalysisDataTower =
  {
    [globalThis.cc.sys.Platform.ANDROID]: CocosAndroid,
    [globalThis.cc.sys.Platform.IOS]: CocosIOS,
  }[globalThis.cc.sys.platform] || Web;

export { Cocos as DataTower };
export default Cocos;
