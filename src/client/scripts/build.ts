import { build, type Options } from 'tsup';

const DefaultConfig: Options = {
  sourcemap: true,
  bundle: true,
  // minify: true,
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
    entry: ['src/CocosCreator/index.ts'],
    outDir: 'dist/CocosCreator',
    format: ['cjs', 'esm', 'iife'],
    globalName: 'DataTower',
  },
};

async function bundle(platform: Platform) {
  const config = ConfigMap[platform];
  await build({
    ...DefaultConfig,
    ...config,
  });
}

bundle('CocosCreator');
