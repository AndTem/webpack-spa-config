import { createLoader, LoaderCreatorParams } from '@webpackon/core';

type BabelLoaderAddParams = {
  enableJSX?: boolean;
  options?: Record<string, any>;
};

export type BabelLoaderOptions = LoaderCreatorParams<BabelLoaderAddParams>;

export const createBabelLoader = createLoader<BabelLoaderAddParams>(
  ({ options, enableJSX }) => ({
    test: enableJSX ? /\.(js|jsx)$/ : /\.js$/,
    exclude: /node_modules/,
    use: [
      'thread-loader',
      {
        loader: 'babel-loader',
        options,
      },
    ],
  })
);
