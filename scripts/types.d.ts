declare module 'esbuild-plugin-babel' {
  import type { NormalizedOptions } from 'tsup';
  import type { TransformOptions } from '@babel/core';

  interface BabelPluginOptions {
    filter?: RegExp;
    namespace?: string;
    config?: TransformOptions;
  }

  export default function pluginBabel(
    options?: BabelPluginOptions,
  ): NonNullable<NormalizedOptions['esbuildPlugins']>[number];
}
