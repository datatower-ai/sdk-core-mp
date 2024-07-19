import Zip from 'adm-zip';
import { readdirSync, rename, watchFile } from 'fs';
import { intersection } from 'lodash-es';
import path from 'path';
import tsup, { type Format, type Options } from 'tsup';
import { command } from './command.js';

const version = process.env.npm_package_version;
const root = process.cwd();

type Platform = 'cocos' | 'web';
type Config = Omit<Options, 'format'> & { format: Format[]; native?: string };

const ConfigMap: Record<Platform, Config[]> = {
  cocos: [
    {
      entry: { cocos: 'src/cocos/index.ts' },
      outDir: 'dist',
      format: ['esm', 'cjs'],
      native: 'src/native/cc',
    },
  ],
  web: [
    {
      entry: { web: 'src/sandbox/index.ts' },
      outDir: 'dist',
      format: ['esm', 'cjs'],
    },
    {
      entry: { web: 'src/sandbox/index.ts' },
      outDir: 'dist',
      format: ['iife'],
      globalName: 'DataTower',
    },
  ],
};

async function buildSingle(config: Config, formats: Format[], defaultConfig: Options) {
  const targetFormat = intersection(config.format, formats);
  if (!targetFormat.length) return;
  await tsup.build({ ...defaultConfig, ...config, format: targetFormat });
  await Promise.all(
    Object.keys(config.entry as object).map((entry) => {
      const filename = `${config.outDir}/${entry}`;
      const [source, target] = [`${filename}.d.ts`, `${filename}.d.mts`];
      if (config.watch) watchFile(source, (curr) => curr && rename(source, target, () => {}));
      return new Promise((resolve) => rename(`${filename}.d.ts`, `${filename}.d.mts`, resolve));
    }),
  );
}

async function build(platforms: Platform[], formats: Format[], defaultConfig: Options) {
  await Promise.all(
    platforms.map(async (platform) => {
      const configs = ConfigMap[platform];
      await Promise.all(configs.map(async (config) => buildSingle(config, formats, defaultConfig)));
      if (defaultConfig.minify) pack(platform, configs.map((config) => config.native).filter(Boolean) as string[]);
    }),
  );
}

function pack(platform: Platform, native?: string[]) {
  const zip = new Zip();
  readdirSync(path.posix.join(root, 'dist')).forEach((file) => {
    if (!file.startsWith(platform)) return;
    zip.addLocalFile(path.posix.join(root, 'dist', file));
  });
  native?.forEach((file) => zip.addLocalFolder(path.posix.join(root, file)));
  zip.writeZip(path.posix.join(root, 'pack', `${platform}-${version}.zip`));
}

// selectableAll
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
