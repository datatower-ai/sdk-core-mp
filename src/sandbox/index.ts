import type { DataTower } from '@/StaticDataTower';

var _default_: DataTower;
/* #if platform === 'web' */
import { Web } from './exports';
_default_ = Web;
/* #elseif platform === 'uniapp' */
import { Uniapp } from './exports';
_default_ = Uniapp;
/* #elseif platform === 'mini-program' */
import { MiniProgram } from './exports';
_default_ = MiniProgram;
/* #endif */

/* #if format === 'iife' */
export default _default_;
/* #else */
export { LogLevel } from '@/Logger';
export type { Config, Properties } from '@/type';
export { _default_ as DataTower };
/* #endif */
