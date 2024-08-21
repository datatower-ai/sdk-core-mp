import { StaticDataTower, type DataTower } from '@/StaticDataTower';
import { MultipleInstanceManager } from '../MultipleInstanceManager';
import { Sandbox } from './main';
import { MiniGamePlatform, MiniGameProgramShim, MiniProgramPlatform } from './shim/MiniGameProgramShim';
import { WebShim } from './shim/WebShim';

class Web extends StaticDataTower {
  protected static readonly instances = new MultipleInstanceManager<DataTower>(() => new Sandbox(new WebShim()));
}

class WechatMimiGame extends StaticDataTower {
  protected static readonly instances = new MultipleInstanceManager<DataTower>(
    () => new Sandbox(new MiniGameProgramShim(MiniGamePlatform.WECHAT)),
  );
}

class WechatMimiProgram extends StaticDataTower {
  protected static readonly instances = new MultipleInstanceManager<DataTower>(
    () => new Sandbox(new MiniGameProgramShim(MiniProgramPlatform.WECHAT)),
  );
}

var _default_: DataTower;
// #if platform === 'web'
_default_ = Web;
// #elseif platform === 'wechat-mimi-game'
_default_ = WechatMimiGame;
// #elseif platform === 'wechat-mimi-program'
_default_ = WechatMimiProgram;
// #else
_default_ = Web;
// #endif

// #if format === 'iife'
export default _default_;
// #else
export { LogLevel, type Config, type Properties } from '@/type';
export { Logger } from './Logger';
export { _default_ as DataTower };
// #endif
