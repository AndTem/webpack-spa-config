const merge = require('webpack-merge');
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const commonConfig = require('../common/common.config');

const prodPlugins = require('./plugins');

const { mergePlugins } = require('../utils/merge');
const { getCompatibilityFileName } = require('../compatibility/utils');

const { PRODUCTION_MODE, DEFAULT_VENDOR_NAME } = require('../constants');

const getOptimization = (additionalOptions, vendorsName) => merge({
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
        filename: vendorsName
      }
    },
    chunks: 'all'
  }
}, additionalOptions);

module.exports = (commonConfigParams, additionalOptions, compatibilityMode) => {
  const { plugins, optimization } = additionalOptions;

  const allPlugins = compatibilityMode ? plugins
  : mergePlugins(prodPlugins(commonConfigParams), plugins);

  const vendorsName = !compatibilityMode ? DEFAULT_VENDOR_NAME
  : getCompatibilityFileName(compatibilityMode, DEFAULT_VENDOR_NAME);

  return merge.smart(
    commonConfig({
      ...commonConfigParams,
      mode: PRODUCTION_MODE,
      compatibilityMode
    }),
    {
      mode: PRODUCTION_MODE,
      devtool: ' hidden-source-map',
      ...additionalOptions,
      optimization: getOptimization(optimization, vendorsName),
      plugins: allPlugins
    }
  );
};
