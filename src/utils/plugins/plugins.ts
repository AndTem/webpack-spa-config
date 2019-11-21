import merge from 'webpack-merge';

import { WebpackPlugin } from 'src/types/plugins';

const getFlatArray = <T>(array: Array<T[]>): T[] =>
  array.reduce((flatArray, currentArray) => flatArray.concat(currentArray), []);

// TODO: learn about the need for deep merge
const deepMergePlugins = (
  ...pluginsArrays: Array<WebpackPlugin[]>
): WebpackPlugin[] => {
  const allPlugins = getFlatArray<WebpackPlugin>(pluginsArrays);
  const mergedPlugins = [];

  allPlugins.forEach(plugin => {
    if (plugin) {
      const { constructor } = plugin;
      const { name } = constructor;

      const foundSamePluginIndex = mergedPlugins.findIndex(
        mergedPlugin => name === mergedPlugin.constructor.name
      );

      if (foundSamePluginIndex !== -1) {
        const mergePluginWithoutConstructor = merge(
          mergedPlugins[foundSamePluginIndex],
          plugin
        );
        const mergePlugin = Object.create(constructor.prototype);

        Object.keys(mergePluginWithoutConstructor).forEach(key => {
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

export { deepMergePlugins };
