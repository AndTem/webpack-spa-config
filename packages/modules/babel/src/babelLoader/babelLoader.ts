import {
  createLoader,
  LoaderCreatorParams,
  getExcludePackagesRegexp,
} from '@webpackon/core';

type BabelLoaderAddParams = {
  enableJSX?: boolean;
  transpileModules?: string[];
  options?: Record<string, any>;
};

export type BabelLoaderOptions = LoaderCreatorParams<BabelLoaderAddParams>;

export const createBabelLoader = createLoader<BabelLoaderAddParams>(
  ({ options, enableJSX, transpileModules }) => ({
    test: enableJSX ? /\.(js|jsx)$/ : /\.js$/,
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
