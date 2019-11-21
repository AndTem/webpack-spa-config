const devConfig = require('./configs/development/development.config');
const prodConfig = require('../old/production/production.config');
const compatibilityConfig = require('../old/compatibility/compatibility.config');

const { mergeConfigOptions } = require('./utils/merge');
const { isDevelopment, isProduction } = require('./utils/mode/mode');

const defaultOptionsFunc = () => ({});

module.exports = ({
  mode,
  basicParams,
  commonOptions = defaultOptionsFunc,
  devOptions = defaultOptionsFunc,
  prodOptions = defaultOptionsFunc
}) => {
  if (isDevelopment(mode)) {
    return devConfig(
      basicParams,
      mergeConfigOptions(commonOptions(mode), devOptions(mode))
    );
  }

  if (isProduction(mode)) {
    return prodConfig(
      basicParams,
      mergeConfigOptions(commonOptions(mode), prodOptions(mode))
    );
  }

  // if not development or production that compatibility
  compatibilityConfig(basicParams, commonOptions, prodOptions);
};
