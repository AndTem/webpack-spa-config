import { createLoader } from 'src/utils/loaders';

export type BabelLoaderAddParams = {
  options?: Record<string, any>;
};

const createBabelLoader = createLoader<BabelLoaderAddParams>(({ options }) => {
  return {
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /node_modules/,
    use: [
      'thread-loader',
      {
        loader: 'babel-loader',
        options
      }
    ]
  };
});

export default createBabelLoader;
