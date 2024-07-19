import { type Options } from 'tsup';
import { start } from './build.base.js';

const DEFAULT_CONFIG: Options = {
  minify: true,
  clean: true,
  dts: true,
  treeshake: true,
  target: 'es5',
  skipNodeModulesBundle: false,
  outExtension: ({ format }) => {
    return {
      cjs: { js: `.cjs`, dts: `.d.cts` },
      esm: { js: `.mjs`, dts: `.d.mts` },
      iife: { js: `.js`, dts: `.d.ts` },
    }[format];
  },
};

start(DEFAULT_CONFIG, true);
