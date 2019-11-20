import { Mode } from 'src/types/mode';

import { babelLoader } from 'src/loaders/scripts';
import { cssLoader } from 'src/loaders/styles';
import { imagesLoader, svgLoader } from 'src/loaders/images';
import { fontsLoader } from 'src/loaders/fonts';

import {
  DEFAULT_PUBLIC_PATH,
  DEFAULT_BUNDLES_FILE_NAME,
  DEFAULT_RESOLVE_EXTENSIONS,
  DEFAULT_RESOLVE_MODULES
} from './constants';

export type CommonConfigParams = {
  entryPath: string;
  outputPath: string;
  mode: Mode;
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
  publicPath = DEFAULT_PUBLIC_PATH,
  scriptsFileName = DEFAULT_BUNDLES_FILE_NAME,
  imagesOutputDirectoryName,
  excludeImages,
  svgSpriteRegExp
}: CommonConfigParams): Record<string, any> => ({
  target: 'web',

  entry: entryPath,

  output: {
    filename: scriptsFileName,
    path: outputPath,
    publicPath
  },

  resolve: {
    modules: DEFAULT_RESOLVE_MODULES,
    extensions: DEFAULT_RESOLVE_EXTENSIONS
  },

  module: {
    rules: [
      babelLoader({ mode }),
      cssLoader({ mode }),
      imagesLoader({
        mode,
        outputDirectoryName: imagesOutputDirectoryName,
        exclude: excludeImages
      }),
      svgLoader({
        mode,
        outputDirectoryName: imagesOutputDirectoryName,
        exclude: svgSpriteRegExp
      }),
      fontsLoader({ mode })
    ]
  }
});

export { createCommonConfig };
