const { isProduction } = require('./mode');

const urlLoaderFileName = (mode, outputDirectoryName) =>
  `${outputDirectoryName}/[name]${isProduction(mode) ? '.[hash]' : ''}.[ext]`;

module.exports = {
  urlLoaderFileName
};
