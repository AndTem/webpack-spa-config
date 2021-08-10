import { createConfigDecorator, addLoader } from '@webpackon/core';

import { createBabelLoader, BabelLoaderOptions } from '../babelLoader';

type WithBabelParams = {
  loaderParams?: BabelLoaderOptions;
};

export const withBabel = createConfigDecorator<WithBabelParams, false>(
  (config, { loaderParams } = {}) =>
    addLoader(config, createBabelLoader(loaderParams))
);
