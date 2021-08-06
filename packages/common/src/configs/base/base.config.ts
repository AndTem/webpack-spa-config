import webpack from 'webpack';

import { babelLoader } from '@webpackon/js';
import { Mode } from '../../types/mode';
import { Config } from '../../types/config';

import { cssLoader } from '../../loaders/styles';
import { imagesLoader, svgLoader } from '../../loaders/images';
import { fontsLoader } from '../../loaders/fonts';

import { DEFAULT_RESOLVE_OPTION, DEFAULT_OUTPUT_OPTION } from './constants';

export type CommonConfigParams = {
  entry: webpack.Configuration['entry'];
  output?: webpack.Configuration['output'];
  resolve?: webpack.Configuration['resolve'];
  mode: Mode;
  imagesOutputDirectoryName?: string;
  excludeImages?: RegExp | string[];
  svgSpriteRegExp?: RegExp;
};

const createCommonConfig = ({
  entry,
  output = DEFAULT_OUTPUT_OPTION,
  resolve = DEFAULT_RESOLVE_OPTION,
  mode,
  imagesOutputDirectoryName,
  excludeImages,
  svgSpriteRegExp,
}: CommonConfigParams): Config => ({
  target: 'web',

  entry,
  output,
  resolve,

  module: {
    rules: [
      babelLoader({ mode }),
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
