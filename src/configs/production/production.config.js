const merge = require('webpack-merge');

const commonConfig = require('../common/common.config');

const prodPlugins = require('./plugins');

const { mergePlugins } = require('../../utils/merge');
const { getCompatibilityFileName } = require('../compatibility/utils');
const getOptimization = require('./optimization');

const { PRODUCTION_MODE, DEFAULT_VENDOR_NAME } = require('../../constants');

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
