import { build, type Options } from 'tsup';

const DefaultConfig: Options = {
  clean: false,
  // dts: true,
  treeshake: true,
  watch: true,
  outExtension: ({ format }) => {
    return {
      cjs: { js: `.cjs`, dts: `.d.cts` },
      esm: { js: `.mjs`, dts: `.d.mts` },
      iife: { js: `.js`, dts: `.d.ts` },
    }[format];
  },
};

type Platform = 'CocosCreator';

const exampleDir = '../../Example';

const ConfigMap: Record<Platform, Options> = {
  CocosCreator: {
    entry: { 'dt.cc': 'src/CocosCreator/index.ts' },
    outDir: `${exampleDir}/cc/assets/libs`,
    format: ['esm'],
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
