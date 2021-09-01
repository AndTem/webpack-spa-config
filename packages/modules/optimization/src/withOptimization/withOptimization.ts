import {
  createConfigDecorator,
  addPlugins,
  Mode,
  isProduction,
} from '@webpackon/core';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';

import { getCacheGroups } from './utils';

type WithOptimizationParams = {
  mode: Mode;
  dropConsole?: boolean;
  splitChunkCacheGroups?: Array<{
    chunkName: string;
    includePackages: string[];
  }>;
};

export const withOptimization = createConfigDecorator<
  WithOptimizationParams,
  true
>((config, { mode, dropConsole = true, splitChunkCacheGroups }) => {
  if (!isProduction(mode)) return config;

  const modifyConfig = addPlugins([new CaseSensitivePathsPlugin()]);

  return modifyConfig({
    ...config,

    devtool: 'hidden-source-map',

    optimization: {
      ...config.optimization,
      moduleIds: 'deterministic',
      minimizer: [
        ...config.optimization.minimizer,
        new TerserWebpackPlugin({
          parallel: true,
          terserOptions: {
            compress: {
              drop_console: dropConsole,
            },
          },
        }),
      ],
      runtimeChunk: true,
      splitChunks: {
        cacheGroups: getCacheGroups(splitChunkCacheGroups) as any,
        chunks: 'all',
      },
    },
  });
});
