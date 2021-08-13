import { ModifyConfigFunc, isProduction } from '@webpackon/core';
import { withBabel } from '@webpackon/babel';
import { withCss } from '@webpackon/css';

import path from 'path';

import { AdditionalEntryParams } from '../entry';

export const createFoundationConfig: ModifyConfigFunc<AdditionalEntryParams> = (
  _,
  { entry, output, resolve, mode, transpileModules }
) => {
  const baseConfig = {
    target: 'web',

    entry,

    output: {
      publicPath: '/',
      filename: '[hash].bundle.js',
      path: path.join(process.cwd(), 'build'),
      clean: isProduction(mode),
      ...output,
    },

    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.less'],
      ...resolve,
    },
  };

  return withCss(withBabel(baseConfig, { transpileModules }), { mode });
};
