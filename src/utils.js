const { resolve } = require('path');

const { PRODUCTION_MODE } = require('./constants');

const isProduction = mode => mode === PRODUCTION_MODE;

const urlLoaderFileName = (mode, outputDirectoryName) =>
  resolve(outputDirectoryName, `${isProduction(mode) ? 'hash' : 'name'}].[ext]`);

const mergePlugins = (...plugins) => {
  const allPlugins = plugins[0].concat(plugins[1]);
  const mergedPlugins = [];

  allPlugins.forEach((plugin) => {
    if (plugin) {
      const { constructor } = plugin;
      const { name } = constructor;

      const foundSamePluginIndex = mergedPlugins.findIndex(mergedPlugin => name === mergedPlugin.constructor.name);

      if (foundSamePluginIndex !== -1) {
        const mergePluginWithoutConstructor = merge(mergedPlugins[foundSamePluginIndex], plugin);
        const mergePlugin = Object.create(constructor.prototype);

        Object.keys(mergePluginWithoutConstructor).forEach((key) => {
          mergePlugin[key] = mergePluginWithoutConstructor[key];
        });

        mergedPlugins[foundSamePluginIndex] = mergePlugin;

        return;
      }

      mergedPlugins.push(plugin);
    }
  });

  return mergedPlugins;
};

module.exports = {
  isProduction,
  urlLoaderFileName,
  mergePlugins
};
