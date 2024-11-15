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

const root = process.cwd();
const releasePath = path.join(root, 'release');
const publishPath = path.join(root, 'publish');
const distPath = path.join(root, 'bundle');
const sandbox = <const>['web', 'uniapp', 'mini-program'];

type Mode = 'development' | 'release' | 'publish';
type Platform = 'cocos' | (typeof sandbox)[number];
type Config = Omit<Options, 'entry' | 'format' | 'plugins'> & {
  entry: { [k in Platform | 'index']?: string };
  format: Format[];
  native?: string;
  version: string;
  dependencies: string[];
};
type BaseOptions = Omit<Options, 'plugins'> & {
  plugins: (opts: { mode: Mode; platform: Platform; format: Format[] }) => Options['plugins'];
};

const BaseConfig: BaseOptions = {
  tsconfig: 'tsconfig.app.json',
  outExtension: ({ format }) => {
    return {
      cjs: { js: `.cjs`, dts: `.d.cts` },
      esm: { js: `.mjs`, dts: `.d.mts` },
      iife: { js: `.js`, dts: `.d.ts` },
    }[format];
  },
  plugins: ({ mode, platform, format }) => [ConditionalAnnotationPlugin({ mode, platform, format: format.join(',') })],
};
const ModeConfigMap: Record<Mode, Omit<Options, 'plugins'>> = {
  development: {
    watch: true,
    dts: true,
    treeshake: false,
  },
  release: {
    minify: true,
    clean: true,
    dts: true,
    treeshake: true,
    skipNodeModulesBundle: false,
    noExternal: ['crypto-es', 'ua-parser-js'],
  },
  publish: {
    minify: true,
    clean: true,
    dts: true,
    treeshake: true,
    outExtension: void 0,
  },
};
const PlatformConfigs: Config[] = [
  {
    entry: { cocos: 'src/cocos/index.ts' },
    outDir: distPath,
    format: ['esm', 'cjs'],
    native: 'src/native/cc',
    version: '1.0.0',
    dependencies: [],
  },
  ...(sandbox.map((platform) => ({
    entry: { [platform]: 'src/sandbox/index.ts' },
    outDir: distPath,
    format: ['esm', 'cjs'],
    version: '1.0.1',
    dependencies: ['crypto-es', platform === 'web' ? 'ua-parser-js' : ''],
  })) as Config[]),
  {
    entry: { web: 'src/sandbox/index.ts' },
    outDir: distPath,
    format: ['iife'],
    globalName: 'DataTower',
    target: 'es5',
    version: '1.0.1',
    dependencies: ['crypto-es', 'ua-parser-js'],
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
): Promise<{ mode: Mode | unknown; platform: P | 'all'; format: F | 'all' }> {
  const { mode } = await yargs(hideBin(process.argv)).argv;

  const platforms = Object.keys(options) as P[];
  const { platform } = await inquirer.prompt<{ platform: P }>([
    {
      type: 'list',
      name: 'platform',
      message: 'Select a platform to build',
      choices: mode !== 'development' ? ['all', ...platforms] : platforms,
    },
  ]);
  if (mode !== 'development') return { mode, platform, format: 'all' };
  const formats = platform === 'all' ? [...new Set(Object.values(options).flat())] : options[platform];
  const { format } = await inquirer.prompt([
    {
      type: 'list',
      name: 'format',
      message: 'Select a format to build',
      choices: formats,
    },
  ]);
  return { mode, platform, format };
}

async function build(config: Config, mode: Mode) {
  if (!config.format.length) return;
  await tsup.build(config);
  if (mode === 'publish' || config.format.includes('iife')) return;
  await Promise.all(
    Object.keys(config.entry as object).map((entry) => {
      const filename = `${config.outDir}/${entry}`;
      const [source, target] = [`${filename}.d.ts`, `${filename}.d.mts`];
      if (config.watch) fs.watchFile(source, (curr) => curr && fs.rename(source, target, () => {}));
      return new Promise((resolve) => fs.rename(source, target, resolve));
    }),
  );
}

async function bundle(opts: { platforms: Platform[]; formats: Format[]; mode: Mode; defaultConfig: BaseOptions }) {
  const { platforms, formats, mode, defaultConfig } = opts;
  await Promise.all(
    platforms.map(async (platform) => {
      let configs = PlatformConfigs.filter((config) => config.entry[platform]);
      configs = configs.map((config) => {
        const format = intersection(config.format, formats);
        return {
          ...defaultConfig,
          ...config,
          format,
          plugins: defaultConfig.plugins({ mode, platform, format }),
          define: { 'process.env.VERSION': JSON.stringify(config.version) },
        };
      });
      if (mode === 'publish')
        configs = configs
          .filter((config) => !config.format.includes('iife'))
          .map((config) => ({
            ...config,
            outDir: path.join(publishPath, platform, 'dist'),
            entry: { index: config.entry[platform] },
          }));
      await Promise.all(configs.map(async (config) => build(config, mode)));
      if (mode === 'release')
        compression(platform, configs[0].version, configs.map((config) => config.native).filter(Boolean) as string[]);
      if (mode === 'publish') {
        const { version, dependencies } = configs[0];
        copyNPM({ target: path.join(publishPath, platform), platform, version, dependencies });
      }
    }),
  );
}

function compression(platform: Platform, version: string, native?: string[]) {
  const zip = new Zip();
  fs.readdirSync(distPath).forEach((file) => {
    if (!file.startsWith(platform)) return;
    zip.addLocalFile(path.join(distPath, file), '', `dt.${file}`);
  });
  native?.forEach((file) => zip.addLocalFolder(path.join(root, file)));
  zip.writeZip(path.join(releasePath, `${platform}-${version}.zip`));
}

function copyNPM(opts: { target: string; platform: Platform; version: string; dependencies: string[] }) {
  const { target, platform, version } = opts;
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf-8'));
  pkg.name = `@datatower-ai/sdk-core-${platform}`;
  pkg.version = version;
  delete pkg.scripts;
  delete pkg.devDependencies;
  Object.keys(pkg.dependencies).forEach((dep) => !opts.dependencies.includes(dep) && delete pkg.dependencies[dep]);
  !Object.keys(pkg.dependencies).length && delete pkg.dependencies;
  fs.writeFileSync(path.join(target, 'package.json'), JSON.stringify(pkg, null, 2));
  fs.copyFileSync(path.join(root, 'LICENSE'), path.join(target, 'LICENSE'));
}

async function main() {
  const options = PlatformConfigs.reduce(
    (acc, cur) => (Object.keys(cur.entry).forEach((k) => (acc[k as Platform] ??= []).push(...cur.format)), acc),
    {} as Record<Platform, Format[]>,
  );
  const platform = Object.keys(options) as Platform[];
  const format = ['esm', 'cjs', 'iife'] as Format[];
  const params = await command(options);
  const platforms = params.platform === 'all' ? platform : [params.platform];
  const formats = params.format === 'all' ? format : [params.format];
  const mode = (params.mode ?? 'development') as Mode;
  await bundle({ platforms, formats, mode, defaultConfig: { ...BaseConfig, ...ModeConfigMap[mode] } });
}

main();
