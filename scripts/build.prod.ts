import Zip from 'adm-zip';
import { rename } from 'fs';
import inquirer from 'inquirer';
import path from 'path';
import tsup, { type Options } from 'tsup';

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
    entry: { 'dt.cc': 'src/cocos/index.ts' },
    outDir: 'dist/cocos',
    format: ['esm', 'cjs'],
    native: 'src/native/cc',
  },
  web: {
    entry: { 'dt.web': 'src/sandbox/index.ts' },
    outDir: 'dist/web',
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
  zip.addLocalFolder(path.posix.join(root, 'dist', platform));
  if (native) zip.addLocalFolder(path.posix.join(root, native));
  zip.writeZip(path.posix.join(root, 'dist', `${platform}-${version}.zip`));
}

async function command() {
  const { platform } = await inquirer.prompt([
    {
      type: 'list',
      name: 'platform',
      message: 'Select a platform to build',
      choices: ['all', ...Object.keys(ConfigMap)],
    },
  ]);
  if (platform === 'all') {
    await Promise.all(Object.keys(ConfigMap).map((platform) => build(platform as Platform)));
  } else {
    await build(platform as Platform);
  }
}

command();
