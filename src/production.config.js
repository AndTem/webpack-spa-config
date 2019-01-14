const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const commonConfig = require('./common.config');

const { prodPlugins } = require('./plugins');

const { mergePlugins } = require('./utils');

const { PRODUCTION_MODE } = require('./constants');

const getOptimization = additionalOptions => merge({
  minimizer: [
    new UglifyJsPlugin({
      parallel: true,
      uglifyOptions: {
        compress: { drop_console: true }
      }
    }),
    new OptimizeCSSAssetsPlugin({})
  ],
  runtimeChunk: true,
  splitChunks: {
    chunks: 'all'
  }
}, additionalOptions);

module.exports = (commonConfigParams, additionalOptions) => {
  const { plugins, optimization } = additionalOptions;

  return merge(
    commonConfig({ ...commonConfigParams, mode: PRODUCTION_MODE }),
    {
      mode: PRODUCTION_MODE,
      devtool: ' hidden-source-map',
      ...additionalOptions,
      optimization: getOptimization(optimization),
      plugins: mergePlugins(prodPlugins(commonConfigParams), plugins)
    }
  );
};
