import { createLoader } from '@webpackon/core';

export type BabelLoaderAddParams = {
  options?: Record<string, any>;
};

const createBabelLoader = createLoader<BabelLoaderAddParams>(({ options }) => ({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: [
    'thread-loader',
    {
      loader: 'babel-loader',
      options,
    },
  ],
}));

export default createBabelLoader;
