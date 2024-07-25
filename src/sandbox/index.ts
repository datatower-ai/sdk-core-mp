import { StaticDataTower } from '@/StaticDataTower';
import { Sandbox } from './main';
import { WebShim } from './shim/WebShim';
export { LogLevel, type Config, type Properties, type PublicKey } from '@/type';
export { Logger } from './Logger';

export class Web extends StaticDataTower {
  protected static createInstance = () => new Sandbox(new WebShim());
}

// TODO: more platform
// export class QuickApp extends StaticDataTower {
//   protected static createInstance = () => new Sandbox(new QuickAppShim());
// }

// export class HuaweiQuickGame extends StaticDataTower {
//   protected static createInstance = () => new Sandbox(new QuickGameShim(QuickGamePlatform.HUAWEI));
// }

// export class WechatMimiGame extends StaticDataTower {
//   protected static createInstance = () => new Sandbox(new MiniGameProgramShim(MiniGamePlatform.WECHAT));
// }
