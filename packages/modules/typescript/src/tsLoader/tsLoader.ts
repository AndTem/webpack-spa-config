import {
  createLoader,
  LoaderCreatorParams,
  getExcludePackagesRegexp,
} from '@webpackon/core';

type TsLoaderAddParams = {
  transpileModules?: string[];
  enableTypeCheck?: boolean;
};

export type TsLoaderOptions = LoaderCreatorParams<TsLoaderAddParams>;

export const createTsLoader = createLoader<TsLoaderAddParams>(
  ({ transpileModules, enableTypeCheck = false }) => ({
    test: /\.(ts|tsx)$/,
    exclude: transpileModules
      ? getExcludePackagesRegexp(transpileModules)
      : /node_modules/,
    use: [
      'thread-loader',
      'babel-loader',
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: enableTypeCheck,
        },
      },
    ],
  })
);
