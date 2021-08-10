import { createConfigDecorator, addLoaders } from '@webpackon/core';

import { createBabelLoader, BabelLoaderOptions } from '../babelLoader';

type WithBabelParams = {
  transpileModules?: RegExp[] | string[];
  loaderParams?: BabelLoaderOptions;
};

export const withBabel = createConfigDecorator<WithBabelParams, false>(
  (config, { loaderParams } = {}) =>
    addLoaders(config, [createBabelLoader(loaderParams)])
);
