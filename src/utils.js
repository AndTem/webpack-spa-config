const merge = require('webpack-merge');

const { PRODUCTION_MODE } = require('./constants');

const mergeArray = (...arrays) => {
  const mergedObject = merge(...arrays);

  return Object.keys(merge(...arrays)).map(key => mergedObject[key]);
};

const isProduction = mode => mode === PRODUCTION_MODE;

module.exports = {
  mergeArray,
  isProduction
};
