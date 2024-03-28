import { rename } from 'fs';
import { build, type Options } from 'tsup';

const DefaultConfig: Options = {
  sourcemap: true,
  minify: true,
  clean: true,
  dts: true,
  treeshake: true,
  outExtension: ({ format }) => {
    return {
      cjs: { js: `.cjs`, dts: `.d.cts` },
      esm: { js: `.mjs`, dts: `.d.mts` },
      iife: { js: `.js`, dts: `.d.ts` },
    }[format];
  },
};

type Platform = 'cocos';

const ConfigMap: Record<Platform, Options> = {
  cocos: {
    entry: { 'dt.cc': 'src/cocos/index.ts' },
    outDir: 'dist/cocos',
    format: ['esm', 'cjs'],
  },
};

export async function bundle(platform: Platform, defaultConfig: Options = DefaultConfig) {
  const config = ConfigMap[platform];
  await build({ ...defaultConfig, ...config });
  Object.keys(config.entry as object).forEach((entry) => {
    const filename = `${config.outDir}/${entry}`;
    rename(`${filename}.d.ts`, `${filename}.d.mts`, () => {});
  });
}

bundle('cocos');
