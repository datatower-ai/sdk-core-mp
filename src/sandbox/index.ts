import { StaticDataTower } from '@/src/StaticDataTower';
import { Sandbox } from './Sandbox';
import { WebShim } from './shim/WebShim';
export { Config, LogLevel, Properties, PublicKey } from '@/src/type';
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
//   protected static createInstance = () => new Sandbox(new MiniShim(MiniGamePlatform.WECHAT));
// }
