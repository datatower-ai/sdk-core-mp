import { Logger } from '@/Logger';
import { MultipleInstanceManager } from '@/MultipleInstanceManager';
import { StaticAnalysisDataTower, type AnalysisDataTower } from '@/StaticDataTower';
import { CocosAndroid } from './Android';
import { CocosIOS } from './IOS';
/* #if mode === 'development' */
import { Sandbox } from '@/sandbox/main';
import { WebShim } from '@/sandbox/shim/WebShim';

const CocosWeb = new Sandbox(new WebShim());
/* #endif */

/**
 * cocos platform API
 * includes: android, ios
 */
class Cocos extends StaticAnalysisDataTower {
  protected static instances = new MultipleInstanceManager<AnalysisDataTower>(() => {
    switch (cc.sys.platform) {
      case cc.sys.Platform.ANDROID:
        return new CocosAndroid();
      case cc.sys.Platform.IOS:
        return new CocosIOS();
      default:
        // TODO: Cocos 目前仅支持 native(android/ios)，web 仅供调试使用
        var target = {};
        /* #if mode === 'development' */
        target = CocosWeb;
        /* #endif */
        return new Proxy(target, {
          get(target, key: keyof AnalysisDataTower) {
            return Reflect.get(target, key) ?? (() => Logger.warn(`method '${key}' not implemented for web platform`));
          },
        }) as unknown as AnalysisDataTower;
    }
  });
}

export type * from '@/type';
export { Cocos as DataTower };
