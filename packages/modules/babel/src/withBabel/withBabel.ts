import { createConfigDecorator, addLoaders } from '@webpackon/core';

import { createBabelLoader, BabelLoaderOptions } from '../babelLoader';

type WithBabelParams = Pick<
  BabelLoaderOptions,
  'transpileModules' | 'enableJSX'
> & {
  loaderParams?: BabelLoaderOptions;
};

export const withBabel = createConfigDecorator<WithBabelParams, false>(
  (config, { loaderParams } = {}) =>
    addLoaders([createBabelLoader(loaderParams)])(config)
);
