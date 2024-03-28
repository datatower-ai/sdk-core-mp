import { rename } from 'fs';
import tsup, { type Options } from 'tsup';

const DefaultConfig: Options = {
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

export async function build(platform: Platform, defaultConfig: Options = DefaultConfig) {
  const config = ConfigMap[platform];
  await tsup.build({ ...defaultConfig, ...config });
  await Promise.all(
    Object.keys(config.entry as object).map((entry) => {
      const filename = `${config.outDir}/${entry}`;
      return new Promise((resolve) => rename(`${filename}.d.ts`, `${filename}.d.mts`, resolve));
    }),
  );
}

build('cocos');
