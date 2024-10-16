import { structure } from './main';
import { MiniAppShim } from './shim/MiniAppShim';
import { WebShim } from './shim/WebShim';

/* #if platform === 'web' */
export const Web = structure(new WebShim());
/* #elseif platform === 'uniapp' */
export const Uniapp = structure(new MiniAppShim());
/* #elseif platform === 'mini-program' */
export const MiniProgram = structure(new MiniAppShim());
/* #endif */
