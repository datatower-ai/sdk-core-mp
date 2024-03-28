import { DataTower } from '../DataTower';
import { Sandbox } from './Sandbox';
import { MiniGamePlatform, MiniShim } from './shim/MiniShim';
import { QuickAppShim } from './shim/QuickAppShim';
import { QuickGamePlatform, QuickGameShim } from './shim/QuickGameShim';
import { WebShim } from './shim/WebShim';
export * from '../type';

export class Web extends DataTower {
  protected static instance = new Sandbox(new WebShim());
}

export class QuickApp extends DataTower {
  protected static instance = new Sandbox(new QuickAppShim());
}

export class HuaweiQuickGame extends DataTower {
  protected static instance = new Sandbox(new QuickGameShim(QuickGamePlatform.HUAWEI));
}

export class WechatMimiGame extends DataTower {
  protected static instance = new Sandbox(new MiniShim(MiniGamePlatform.WECHAT));
}
// TODO: more platform
