import { StaticDataTower, type DataTower } from '@/StaticDataTower';
import { MultipleInstanceManager } from '../MultipleInstanceManager';
import { Sandbox } from './main';
import { MiniGamePlatform, MiniGameProgramShim, MiniProgramPlatform } from './shim/MiniGameProgramShim';
import { WebShim } from './shim/WebShim';
export { LogLevel, type Config, type Properties } from '@/type';
export { Logger } from './Logger';

export class Web extends StaticDataTower {
  protected static readonly instances = new MultipleInstanceManager<DataTower>(() => new Sandbox(new WebShim()));
}

export class WechatMimiGame extends StaticDataTower {
  protected static readonly instances = new MultipleInstanceManager<DataTower>(
    () => new Sandbox(new MiniGameProgramShim(MiniGamePlatform.WECHAT)),
  );
}

export class WechatMimiProgram extends StaticDataTower {
  protected static readonly instances = new MultipleInstanceManager<DataTower>(
    () => new Sandbox(new MiniGameProgramShim(MiniProgramPlatform.WECHAT)),
  );
}

// TODO: more platform
// export class QuickApp extends StaticDataTower {
//   protected static createInstance = () => new Sandbox(new QuickAppShim());
// }

// export class HuaweiQuickGame extends StaticDataTower {
//   protected static createInstance = () => new Sandbox(new QuickGameShim(QuickGamePlatform.HUAWEI));
// }
