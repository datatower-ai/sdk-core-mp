import { build, type Options } from 'tsup';

const DefaultConfig: Options = {
  clean: true,
  // dts: true,
  treeshake: true,
  watch: true,
};

type Platform = 'CocosCreator';

const ConfigMap: Record<Platform, Options> = {
  CocosCreator: {
    entry: ['src/CocosCreator/index.ts'],
    outDir: '../../Example/cc/assets/libs/dt-sdk',
    format: ['esm'],
    globalName: 'DataTower',
    outExtension: ({ format }) => {
      return {
        cjs: { js: `.cjs`, dts: `.d.cts` },
        esm: { js: `.mjs`, dts: `.d.mts` },
        iife: { js: `.js`, dts: `.d.ts` },
      }[format];
    },
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
