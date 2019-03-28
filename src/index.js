const devConfig = require('./development/development.config');
const prodConfig = require('./production/production.config');
const compatibilityConfig = require('./compatibility/compatibility.config');

const { mergeConfigOptions } = require('./utils/merge');
const { isDevelopment, isProduction } = require('./utils/mode');

const defaultOptionsFunc = () => ({});

module.exports = (
  mode,
  commonParams,
  {
    commonOptions = defaultOptionsFunc,
    devOptions = defaultOptionsFunc,
    prodOptions = defaultOptionsFunc
  }
) => {
  if (isDevelopment(mode)) {
    return devConfig(
      commonParams,
      mergeConfigOptions(commonOptions(mode), devOptions(mode))
    );
  }

  if (isProduction(mode)) {
    return prodConfig(
      commonParams,
      mergeConfigOptions(commonOptions(mode), prodOptions(mode))
    );
  }

  // if not development or production that compatibility
  compatibilityConfig(
    commonParams,
    commonOptions,
    prodOptions
  )
};
