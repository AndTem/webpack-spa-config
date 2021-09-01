import { createConfigDecorator, addLoaders } from '@webpackon/core';

import { createBabelLoader, BabelLoaderOptions } from '../babelLoader';

type WithBabelParams = Pick<BabelLoaderOptions, 'transpileModules'> & {
  loaderParams?: BabelLoaderOptions;
};

export const withBabel = createConfigDecorator<WithBabelParams, false>(
  (config, { transpileModules, loaderParams } = {}) =>
    addLoaders([createBabelLoader({ transpileModules, ...loaderParams })])(
      config
    )
);
