const cssLoaders = require('./css');
const fontsLoaders = require('./fonts');
const imagesLoaders = require('./images');
const scriptsLoaders = require('./scripts');

module.exports = {
  ...cssLoaders,
  ...fontsLoaders,
  ...imagesLoaders,
  ...scriptsLoaders
};
