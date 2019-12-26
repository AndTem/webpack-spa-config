import webpack from 'webpack';

import { WebpackPlugin } from 'src/types/plugins';
import { Mode } from 'src/types/mode';
import { flat } from '../array';

type PluginsListCreatorParams<AdditionalParams = {}> = {
  mode: Mode;
} & AdditionalParams;

type PluginsListCreator<AdditionalParams = {}> = (
  params: PluginsListCreatorParams<AdditionalParams>
) => WebpackPlugin[];

function createPluginsList<AdditionalParams>(
  pluginsListCreator: PluginsListCreator<AdditionalParams>
) {
  return (
    params: PluginsListCreatorParams<AdditionalParams>
  ): WebpackPlugin[] => {
    const { mode } = params;

    return [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode)
      }),
      ...pluginsListCreator(params)
    ];
  };
}

const mergePlugins = (
  ...pluginsArrays: Array<WebpackPlugin[]>
): WebpackPlugin[] => {
  const allPlugins = flat(pluginsArrays);
  const mergedPlugins = [];

  allPlugins.forEach(plugin => {
    if (plugin) {
      const { constructor } = plugin;
      const { name } = constructor;

      const foundSamePluginIndex = mergedPlugins.findIndex(
        mergedPlugin => name === mergedPlugin.constructor.name
      );

      if (foundSamePluginIndex !== -1) {
        const mergePluginWithoutConstructor = plugin;
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

export { createPluginsList, mergePlugins };
