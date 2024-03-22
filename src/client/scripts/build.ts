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

type Platform = 'CocosCreator';

const ConfigMap: Record<Platform, Options> = {
  CocosCreator: {
    entry: { 'dt.cc': 'src/CocosCreator/index.ts' },
    outDir: 'dist/CocosCreator',
    format: ['esm', 'cjs'],
    globalName: 'DataTower',
  },
};

export async function bundle(platform: Platform, defaultConfig: Options = DefaultConfig) {
  const config = ConfigMap[platform];
  await build({
    ...defaultConfig,
    ...config,
  });
}

bundle('CocosCreator');
