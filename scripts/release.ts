import Zip from 'adm-zip';
import ConditionalAnnotationBabelPlugin from 'babel-plugin-conditional-annotation';
import pluginBabel from 'esbuild-plugin-babel';
import inquirer from 'inquirer';
import { intersection } from 'lodash-es';
import fs from 'node:fs';
import path from 'node:path/posix';
import type { Format, Options } from 'tsup';
import tsup from 'tsup';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

const version = process.env.npm_package_version;
const root = process.cwd();
const releasePath = path.join(root, 'release');
const distPath = path.join(root, 'bundle');
const sandbox = <const>['web', 'wechat-mimi-game', 'wechat-mimi-program'];

type Platform = 'cocos' | (typeof sandbox)[number];
type Config = Omit<Options, 'entry' | 'format'> & {
  entry: { [k in Platform]?: string };
  format: Format[];
  native?: string;
};

const BaseConfig: Options = {
  outExtension: ({ format }) => {
    return {
      cjs: { js: `.cjs`, dts: `.d.cts` },
      esm: { js: `.mjs`, dts: `.d.mts` },
      iife: { js: `.js`, dts: `.d.ts` },
    }[format];
  },
};
const ModeConfigMap: Record<'production' | 'development', Options> = {
  production: {
    minify: true,
    clean: true,
    dts: true,
    treeshake: true,
    skipNodeModulesBundle: false,
    noExternal: ['crypto-es', 'ua-parser-js'],
  },
  development: {
    watch: true,
    dts: true,
    treeshake: false,
    target: 'esnext',
  },
};
const PlatformConfigs: Config[] = [
  {
    entry: { cocos: 'src/cocos/index.ts' },
    outDir: distPath,
    format: ['esm', 'cjs'],
    native: 'src/native/cc',
  },
  ...(sandbox.map((platform) => ({
    entry: { [platform]: 'src/sandbox/index.ts' },
    outDir: distPath,
    format: ['esm', 'cjs'],
    plugins: [ConditionalAnnotationPlugin({ platform, format: 'esm,cjs' })],
  })) as Config[]),
  {
    entry: { web: 'src/sandbox/index.ts' },
    outDir: distPath,
    format: ['iife'],
    globalName: 'DataTower',
    plugins: [ConditionalAnnotationPlugin({ platform: 'web', format: 'iife' })],
  },
];

function ConditionalAnnotationPlugin(
  env: Record<string, string | number | boolean>,
): NonNullable<Options['plugins']>[number] {
  return {
    name: 'conditional-annotation',
    buildStart() {
      (this.options.esbuildPlugins ??= []).push(
        pluginBabel({
          filter: /\.(js|ts)$/,
          config: {
            plugins: ['@babel/plugin-transform-typescript', [ConditionalAnnotationBabelPlugin, env]],
          },
        }),
      );
    },
  };
}

async function command<P extends string, F extends string>(
  options: Record<P, F[]>,
): Promise<{ mode: unknown; platform: P | 'all'; format: F | 'all' }> {
  const { mode } = await yargs(hideBin(process.argv)).argv;
  const selectableAll = mode === 'production';

  const platforms = Object.keys(options) as P[];
  const { platform } = await inquirer.prompt<{ platform: P }>([
    {
      type: 'list',
      name: 'platform',
      message: 'Select a platform to build',
      choices: selectableAll ? ['all', ...platforms] : platforms,
    },
  ]);
  const formats = platform === 'all' ? [...new Set(Object.values(options).flat())] : options[platform];
  const { format } = await inquirer.prompt([
    {
      type: 'list',
      name: 'format',
      message: 'Select a format to build',
      choices: selectableAll ? ['all', ...formats] : formats,
    },
  ]);
  return { mode, platform, format };
}

async function buildSingle(config: Config, formats: Format[], defaultConfig: Options) {
  const targetFormat = intersection(config.format, formats);
  if (!targetFormat.length) return;
  await tsup.build({ ...defaultConfig, ...config, format: targetFormat });
  await Promise.all(
    Object.keys(config.entry as object).map((entry) => {
      const filename = `${config.outDir}/${entry}`;
      const [source, target] = [`${filename}.d.ts`, `${filename}.d.mts`];
      if (config.watch) fs.watchFile(source, (curr) => curr && fs.rename(source, target, () => {}));
      return new Promise((resolve) => fs.rename(`${filename}.d.ts`, `${filename}.d.mts`, resolve));
    }),
  );
}

async function build(platforms: Platform[], formats: Format[], defaultConfig: Options) {
  await Promise.all(
    platforms.map(async (platform) => {
      const configs = PlatformConfigs.filter((config) => config.entry[platform]);
      await Promise.all(configs.map(async (config) => buildSingle(config, formats, defaultConfig)));
      if (defaultConfig.minify) bundle(platform, configs.map((config) => config.native).filter(Boolean) as string[]);
    }),
  );
}

function bundle(platform: Platform, native?: string[]) {
  const zip = new Zip();
  fs.readdirSync(distPath).forEach((file) => {
    if (!file.startsWith(platform)) return;
    zip.addLocalFile(path.join(distPath, file));
  });
  native?.forEach((file) => zip.addLocalFolder(path.join(root, file)));
  zip.writeZip(path.join(releasePath, `${platform}-${version}.zip`));
}

async function main() {
  const options = PlatformConfigs.reduce(
    (acc, cur) => (Object.keys(cur.entry).forEach((k) => (acc[k as Platform] ??= []).push(...cur.format)), acc),
    {} as Record<Platform, Format[]>,
  );
  const platforms = Object.keys(options) as Platform[];
  const formats = ['esm', 'cjs', 'iife'] as Format[];
  const params = await command(options);
  const platform = params.platform === 'all' ? platforms : [params.platform];
  const format = params.format === 'all' ? formats : [params.format];
  const mode = params.mode === 'production' ? 'production' : 'development';
  await build(platform, format, { ...BaseConfig, ...ModeConfigMap[mode] });
}

main();
