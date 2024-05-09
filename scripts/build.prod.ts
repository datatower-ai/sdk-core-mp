import Zip from 'adm-zip';
import { readdirSync, rename } from 'fs';
import path from 'path';
import tsup, { type Options } from 'tsup';
import { command } from './command.js';

const version = process.env.npm_package_version;
const root = process.cwd();

const DEFAULT_CONFIG: Options = {
  minify: true,
  clean: true,
  dts: true,
  treeshake: true,
  skipNodeModulesBundle: false,
  outExtension: ({ format }) => {
    return {
      cjs: { js: `.cjs`, dts: `.d.cts` },
      esm: { js: `.mjs`, dts: `.d.mts` },
      iife: { js: `.js`, dts: `.d.ts` },
    }[format];
  },
};

type Platform = 'cocos' | 'web';

const ConfigMap: Record<Platform, Options & { native?: string }> = {
  cocos: {
    entry: { cocos: 'src/cocos/index.ts' },
    outDir: 'dist',
    format: ['esm', 'cjs'],
    native: 'src/native/cc',
  },
  web: {
    entry: { web: 'src/sandbox/index.ts' },
    outDir: 'dist',
    format: ['esm', 'cjs'],
  },
};

async function build(platform: Platform, defaultConfig: Options = DEFAULT_CONFIG) {
  const config = ConfigMap[platform];
  await tsup.build({ ...defaultConfig, ...config });
  await Promise.all(
    Object.keys(config.entry as object).map((entry) => {
      const filename = `${config.outDir}/${entry}`;
      return new Promise((resolve) => rename(`${filename}.d.ts`, `${filename}.d.mts`, resolve));
    }),
  );
  pack(platform, config.native);
}

function pack(platform: Platform, native?: string) {
  const zip = new Zip();
  readdirSync(path.posix.join(root, 'dist')).forEach((file) => {
    if (!file.startsWith(platform)) return;
    zip.addLocalFile(path.posix.join(root, 'dist', file));
  });
  if (native) zip.addLocalFolder(path.posix.join(root, native));
  zip.writeZip(path.posix.join(root, 'pack', `${platform}-${version}.zip`));
}

async function main() {
  const platforms = Object.keys(ConfigMap) as Platform[];
  const { platform } = await command(platforms);
  platform === 'all' ? await Promise.all(platforms.map((platform) => build(platform))) : await build(platform);
}

main();
