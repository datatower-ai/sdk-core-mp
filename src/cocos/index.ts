export * from '@/type';
import { StaticAnalysisDataTower, type AnalysisDataTower } from '@/StaticDataTower';
import { MultipleInstanceManager } from '../MultipleInstanceManager';
import { Logger } from '../sandbox/Logger';
import { Sandbox } from '../sandbox/main';
import { WebShim } from '../sandbox/shim/WebShim';
import { CocosAndroid } from './Android';
import { CocosIOS } from './IOS';

/**
 * cocos platform API
 * includes: android, ios, quick app, mini game, mini program
 */
class Cocos extends StaticAnalysisDataTower {
  protected static instances = new MultipleInstanceManager<AnalysisDataTower>(() => {
    switch (cc.sys.platform) {
      case cc.sys.Platform.ANDROID:
        return new CocosAndroid();
      case cc.sys.Platform.IOS:
        return new CocosIOS();
      default:
        return new Proxy(new Sandbox(new WebShim()), {
          get(target, key: keyof AnalysisDataTower) {
            return Reflect.get(target, key) ?? (() => Logger.warn(`method '${key}' not implemented for web platform`));
          },
        }) as unknown as AnalysisDataTower;
    }
  });
}

export { Cocos as DataTower };
