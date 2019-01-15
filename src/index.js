const devConfig = require('./development.config');
const prodConfig = require('./production.config');

const { mergeConfigOptions } = require('./utils');

const { DEVELOPMENT_MODE, PRODUCTION_MODE } = require('./constants');

const emptyFunc = () => ({});

module.exports = (
  mode,
  commonParams,
  {
    commonOptions = emptyFunc,
    devOptions = emptyFunc,
    prodOptions = emptyFunc
  }
) => {
  if (mode === DEVELOPMENT_MODE) {
    return devConfig(commonParams, mergeConfigOptions(commonOptions(mode), devOptions(mode)));
  }

  if (mode === PRODUCTION_MODE) {
    return prodConfig(commonParams, mergeConfigOptions(commonOptions(mode), prodOptions(mode)));
  }
};
