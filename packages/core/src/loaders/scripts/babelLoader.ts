import { createLoader } from '../../utils/loaders';

export type BabelLoaderAddParams = {
  options?: Record<string, any>;
};

const createBabelLoader = createLoader<BabelLoaderAddParams>(({ options }) => ({
  test: /\.(js|jsx|ts|tsx)$/,
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
