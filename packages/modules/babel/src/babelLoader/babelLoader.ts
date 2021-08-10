import { createLoader, LoaderCreatorParams } from '@webpackon/core';

type BabelLoaderAddParams = {
  options?: Record<string, any>;
};

export type BabelLoaderOptions = LoaderCreatorParams<BabelLoaderAddParams>;

export const createBabelLoader = createLoader<BabelLoaderAddParams>(
  ({ options }) => ({
    test: /\.(js|jsx)$/,
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
