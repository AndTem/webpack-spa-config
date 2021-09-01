import { createConfigDecorator, addLoaders } from '@webpackon/core';

import { createTsLoader, TsLoaderOptions } from '../tsLoader';

type WithTsParams = Pick<
  TsLoaderOptions,
  'transpileModules' | 'enableTypeCheck'
> & {
  loaderParams?: TsLoaderOptions;
};

export const withTs = createConfigDecorator<WithTsParams, false>(
  (config, { transpileModules, enableTypeCheck, loaderParams } = {}) =>
    addLoaders([
      createTsLoader({ transpileModules, enableTypeCheck, ...loaderParams }),
    ])(config)
);
