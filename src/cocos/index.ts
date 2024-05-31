export * from '@/type';
import type { AnalysisDataTower } from '@/StaticDataTower';
import { Web } from '@/sandbox/index';
import { CocosAndroid } from './Android';
import { CocosIOS } from './IOS';

/**
 * cocos platform API
 * includes: android, ios, quick app, mini game, mini program
 */
const Cocos: AnalysisDataTower =
  {
    [cc.sys.Platform.ANDROID]: CocosAndroid,
    [cc.sys.Platform.IOS]: CocosIOS,
  }[cc.sys.platform] || Web;

export { Cocos as DataTower };
