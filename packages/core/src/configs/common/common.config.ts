import { Mode, CompatibilityMode } from '../../types/mode';
import { Config } from '../../types/config';

import { babelLoader } from '../../loaders/scripts';
import { cssLoader } from '../../loaders/styles';
import { imagesLoader, svgLoader } from '../../loaders/images';
import { fontsLoader } from '../../loaders/fonts';

import {
  DEFAULT_PUBLIC_PATH,
  DEFAULT_SCRIPTS_FILE_NAME,
  DEFAULT_RESOLVE_EXTENSIONS,
  DEFAULT_RESOLVE_MODULES,
} from './constants';

export type CommonConfigParams = {
  entryPath: string;
  outputPath: string;
  mode: Mode;
  compatibilityMode?: CompatibilityMode;
  publicPath?: string;
  scriptsFileName?: string;
  imagesOutputDirectoryName?: string;
  excludeImages?: RegExp | string[];
  svgSpriteRegExp?: RegExp;
};

const createCommonConfig = ({
  entryPath,
  outputPath,
  mode,
  compatibilityMode,
  publicPath = DEFAULT_PUBLIC_PATH,
  scriptsFileName = DEFAULT_SCRIPTS_FILE_NAME,
  imagesOutputDirectoryName,
  excludeImages,
  svgSpriteRegExp,
}: CommonConfigParams): Config => ({
  target: 'web',

  entry: entryPath,

  output: {
    filename: scriptsFileName,
    path: outputPath,
    publicPath,
  },

  resolve: {
    modules: DEFAULT_RESOLVE_MODULES,
    extensions: DEFAULT_RESOLVE_EXTENSIONS,
  },

  module: {
    rules: [
      babelLoader({ mode, options: { envName: compatibilityMode } }),
      cssLoader({ mode }),
      imagesLoader({
        mode,
        outputDirectoryName: imagesOutputDirectoryName,
        exclude: excludeImages,
      }),
      svgLoader({
        mode,
        outputDirectoryName: imagesOutputDirectoryName,
        exclude: svgSpriteRegExp,
      }),
      fontsLoader({ mode }),
    ],
  },
});

export { createCommonConfig };
