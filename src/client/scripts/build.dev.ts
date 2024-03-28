import { rename, watchFile } from 'fs';
import tsup, { type Options } from 'tsup';

const DefaultConfig: Options = {
  watch: true,
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

const exampleDir = '../../Example';

const ConfigMap: Record<Platform, Options> = {
  cocos: {
    entry: { 'dt.cc': 'src/cocos/index.ts' },
    outDir: `${exampleDir}/cc/assets/libs`,
    format: ['esm'],
  },
};

export async function build(platform: Platform, defaultConfig: Options = DefaultConfig) {
  const config = ConfigMap[platform];
  Object.keys(config.entry as object).forEach((entry) => {
    const filename = `${config.outDir}/${entry}`;
    const [source, target] = [`${filename}.d.ts`, `${filename}.d.mts`];
    watchFile(source, (curr) => curr && rename(source, target, () => {}));
  });
  await tsup.build({ ...defaultConfig, ...config });
}

build('cocos');
