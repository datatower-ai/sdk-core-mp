import type { DataTower } from '@/StaticDataTower';

var _default_: DataTower;
/* #if platform === 'web' */
import { Web } from './exports';
_default_ = Web;
/* #elseif platform === 'wechat-mimi-game' */
import { WechatMimiGame } from './exports';
_default_ = WechatMimiGame;
/* #elseif platform === 'wechat-mimi-program' */
import { WechatMimiProgram } from './exports';
_default_ = WechatMimiProgram;
/* #endif */

/* #if format === 'iife' */
export default _default_;
/* #else */
export { LogLevel } from '@/Logger';
export type { Config, Properties } from '@/type';
export { _default_ as DataTower };
/* #endif */
