import { structure } from './main';
import { MiniGamePlatform, MiniGameProgramShim, MiniProgramPlatform } from './shim/MiniGameProgramShim';
import { WebShim } from './shim/WebShim';

/* #if platform === 'web' */
export const Web = structure(new WebShim());
/* #elseif platform === 'wechat-mimi-game' */
export const WechatMimiGame = structure(new MiniGameProgramShim(MiniGamePlatform.WECHAT));
/* #elseif platform === 'wechat-mimi-program' */
export const WechatMimiProgram = structure(new MiniGameProgramShim(MiniProgramPlatform.WECHAT));
/* #endif */
