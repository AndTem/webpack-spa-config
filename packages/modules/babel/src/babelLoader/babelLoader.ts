import {
  createLoader,
  LoaderCreatorParams,
  getExcludePackagesRegexp,
} from '@webpackon/core';

type BabelLoaderAddParams = {
  transpileModules?: string[];
  options?: Record<string, any>;
};

export type BabelLoaderOptions = LoaderCreatorParams<BabelLoaderAddParams>;

export const createBabelLoader = createLoader<BabelLoaderAddParams>(
  ({ options, transpileModules }) => ({
    test: /\.(js|jsx)$/,
    exclude: transpileModules
      ? getExcludePackagesRegexp(transpileModules)
      : /node_modules/,
    use: [
      'thread-loader',
      {
        loader: 'babel-loader',
        options,
      },
    ],
  })
);
