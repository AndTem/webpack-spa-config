const { join } = require('path');

const { isProduction } = require('./mode');

const urlLoaderFileName = (mode, outputDirectoryName) =>
  join(outputDirectoryName, `[name]${isProduction(mode) ? '.[hash]' : ''}.[ext]`);

module.exports = {
  urlLoaderFileName
};
