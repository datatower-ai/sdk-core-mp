import { type Options } from 'tsup';
import { start } from './bundle.base.js';

const DEFAULT_CONFIG: Options = {
  watch: true,
  dts: true,
  treeshake: true,
  target: 'esnext',
  outExtension: ({ format }) => {
    return {
      cjs: { js: `.cjs`, dts: `.d.cts` },
      esm: { js: `.mjs`, dts: `.d.mts` },
      iife: { js: `.js`, dts: `.d.ts` },
    }[format];
  },
};

start(DEFAULT_CONFIG, false);
