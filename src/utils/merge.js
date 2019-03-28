const merge = require('webpack-merge');

const allPluginsReducer = (allPlugins, currentPlugins) => allPlugins.concat(currentPlugins);

const mergePlugins = (...plugins) => {
  const allPlugins = plugins.reduce(allPluginsReducer, []);
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

const mergeConfigOptions = (commonOptions, specialOptions) => {
  const { plugins: commonPlugins } = commonOptions;
  const { plugins: specialPlugins } = specialOptions;

  const mergedOptions = merge(commonOptions, specialOptions);

  if (commonPlugins || specialPlugins) {
    mergedOptions.plugins = mergePlugins(commonPlugins, specialPlugins);
  }

  return mergedOptions;
};

module.exports = {
  mergePlugins,
  mergeConfigOptions
};