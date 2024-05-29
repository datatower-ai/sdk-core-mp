import { rename, watchFile } from 'fs';
import tsup, { type Options } from 'tsup';
import { command } from './command.js';

const DEFAULT_CONFIG: Options = {
  watch: true,
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

type Platform = 'cocos' | 'web';

const ConfigMap: Record<Platform, Options> = {
  cocos: {
    entry: { cocos: 'src/cocos/index.ts' },
    outDir: 'dist',
    format: ['esm'],
  },
  web: {
    entry: { web: 'src/sandbox/index.ts' },
    outDir: 'dist',
    format: ['esm'],
  },
};

async function build(platform: Platform, defaultConfig: Options = DEFAULT_CONFIG) {
  const config = ConfigMap[platform];
  Object.keys(config.entry as object).forEach((entry) => {
    const filename = `${config.outDir}/${entry}`;
    const [source, target] = [`${filename}.d.ts`, `${filename}.d.mts`];
    watchFile(source, (curr) => curr && rename(source, target, () => {}));
  });
  await tsup.build({ ...defaultConfig, ...config });
}

async function main() {
  const platforms = Object.keys(ConfigMap) as Platform[];
  const { platform } = await command(platforms);
  platform === 'all' ? await Promise.all(platforms.map((platform) => build(platform))) : await build(platform);
}

main();
