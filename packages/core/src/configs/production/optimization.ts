import TerserWebpackPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

import { addCompatibilityPrefixToName } from '../../utils/url';

import { CompatibilityMode } from '../../types/mode';

import { DEFAULT_VENDOR_NAME } from './constants';

type Params = {
  compatibilityMode?: CompatibilityMode;
};

const getVendorsFileName = (compatibilityMode?: CompatibilityMode): string =>
  compatibilityMode
    ? addCompatibilityPrefixToName(compatibilityMode, DEFAULT_VENDOR_NAME)
    : DEFAULT_VENDOR_NAME;

const createDefaultOptimization = ({
  compatibilityMode,
}: Params): Record<string, any> => ({
  minimizer: [
    new TerserWebpackPlugin({
      parallel: true,
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    }),
    new OptimizeCSSAssetsPlugin({}),
  ],
  runtimeChunk: true,
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /node_modules/,
        chunks: 'initial',
        filename: getVendorsFileName(compatibilityMode),
      },
    },
    chunks: 'all',
  },
});

export { createDefaultOptimization };
