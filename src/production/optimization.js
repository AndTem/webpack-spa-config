const merge = require('webpack-merge');
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const { mergePlugins } = require('../utils/merge');

module.exports = (additionalOptions = {}, vendorsName) => {
  const { minimizer: additionalMinimizer, ...othersAdditionalOptions } = additionalOptions;

  let defaultMinimizer = [
    new TerserWebpackPlugin({
      parallel: true,
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    }),
    new OptimizeCSSAssetsPlugin({})
  ];

  return merge(
    {
      minimizer: mergePlugins(defaultMinimizer, additionalMinimizer),
      runtimeChunk: true,
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            filename: vendorsName
          }
        },
        chunks: 'all'
      }
    },
    othersAdditionalOptions
  );
};
