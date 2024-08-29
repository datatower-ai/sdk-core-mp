import { structure } from './main';
import { MiniAppShim, MiniGamePlatform, MiniProgramPlatform } from './shim/MiniAppShim';
import { WebShim } from './shim/WebShim';

/* #if platform === 'web' */
export const Web = structure(new WebShim());
/* #elseif platform === 'uniapp' */
export const Uniapp = structure(new MiniAppShim('uniapp'));
/* #elseif platform === 'wechat-mimi-game' */
export const WechatMimiGame = structure(new MiniAppShim(MiniGamePlatform.WECHAT));
/* #elseif platform === 'wechat-mimi-program' */
export const WechatMimiProgram = structure(new MiniAppShim(MiniProgramPlatform.WECHAT));
/* #endif */
