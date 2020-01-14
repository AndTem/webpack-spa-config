import TerserWebpackPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

import { DEFAULT_VENDOR_NAME } from './constants';

const createDefaultOptimization = (): Record<string, any> => ({
  minimizer: [
    new TerserWebpackPlugin({
      parallel: true,
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    }),
    new OptimizeCSSAssetsPlugin({})
  ],
  runtimeChunk: true,
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /node_modules/,
        chunks: 'initial',
        filename: DEFAULT_VENDOR_NAME
      }
    },
    chunks: 'all'
  }
});

export { createDefaultOptimization };
