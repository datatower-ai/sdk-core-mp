import Zip from 'adm-zip';
import ConditionalAnnotationBabelPlugin from 'babel-plugin-conditional-annotation';
import pluginBabel from 'esbuild-plugin-babel';
import { intersection } from 'lodash-es';
import fs from 'node:fs';
import path from 'node:path/posix';
import type { Format, Options } from 'tsup';
import tsup from 'tsup';
import { command } from './command.js';

const version = process.env.npm_package_version;
const root = process.cwd();
const bundlePath = path.join(root, 'bundle');
const distPath = path.join(root, 'bundle/dist');
const sandbox = <const>['web', 'wechat-mimi-game', 'wechat-mimi-program'];

type Platform = 'cocos' | (typeof sandbox)[number];
type Config = Omit<Options, 'format'> & { format: Format[]; native?: string };

const ConfigMap: Record<Platform, Config[]> = {
  cocos: [
    {
      entry: { cocos: 'src/cocos/index.ts' },
      outDir: distPath,
      format: ['esm', 'cjs'],
      native: 'src/native/cc',
    },
  ],
  ...(Object.fromEntries(
    sandbox.map((platform) => [
      platform,
      ['esm', 'cjs', platform === 'web' && 'iife'].filter(Boolean).map((format) => ({
        entry: { [platform]: 'src/sandbox/index.ts' },
        outDir: distPath,
        format: [format],
        globalName: 'DataTower',
        plugins: [ConditionalAnnotationPlugin({ platform, format })],
      })),
    ]),
  ) as Record<(typeof sandbox)[number], Config[]>),
};

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
      const configs = ConfigMap[platform];
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
  zip.writeZip(path.join(bundlePath, `${platform}-${version}.zip`));
}

export async function start(defaultConfig: Options, selectableAll: boolean) {
  const options = Object.fromEntries(
    Object.entries(ConfigMap).map(([platform, configs]) => {
      const formats = Object.values(configs).map((c) => c.format);
      return [platform as Platform, [...new Set(formats.flat())]];
    }),
  ) as Record<Platform, Format[]>;
  const platforms = Object.keys(ConfigMap) as Platform[];
  const formats = ['esm', 'cjs', 'iife'] as Format[];
  const params = await command(options, selectableAll);
  const platform = params.platform === 'all' ? platforms : [params.platform];
  const format = params.format === 'all' ? formats : [params.format];
  await build(platform, format, defaultConfig);
}
