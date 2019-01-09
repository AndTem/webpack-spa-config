const merge = require('webpack-merge');

const devConfig = require('./development.config');
const prodConfig = require('./production.config');

const { DEVELOPMENT_MODE, PRODUCTION_MODE } = require('./constants');

const emptyFunc = () => ({});

module.exports = (mode, commonParams, { commonOptions, devOptions = emptyFunc, prodOptions = emptyFunc }) => {
  if (mode === DEVELOPMENT_MODE) {
    return devConfig(commonParams, merge(commonOptions(mode), devOptions(mode)));
  }

  if (mode === PRODUCTION_MODE) {
    return prodConfig(commonParams, merge(commonOptions(mode), prodOptions(mode)));
  }
};
