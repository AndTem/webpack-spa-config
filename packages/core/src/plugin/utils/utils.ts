import webpack from 'webpack';

import { DEFAULT_EXCLUDE_MERGE_PLUGINS_NAMES } from '../constants';

import { Plugin } from '../types';
import { Mode } from '../../mode';
import { Config } from '../../config';

type PluginsListCreatorParams<AdditionalParams = {}> = {
  mode: Mode;
} & AdditionalParams;

type PluginsListCreator<AdditionalParams = {}> = (
  params: PluginsListCreatorParams<AdditionalParams>
) => Plugin[];

export function createPluginsList<AdditionalParams>(
  pluginsListCreator: PluginsListCreator<AdditionalParams>
) {
  return (params: PluginsListCreatorParams<AdditionalParams>): Plugin[] => {
    const { mode } = params;

    return [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      ...pluginsListCreator(params),
    ];
  };
}

export const mergePlugins = (...pluginsArrays: Array<Plugin[]>): Plugin[] => {
  const allPlugins = pluginsArrays.flat();
  const mergedPlugins = [];

  allPlugins.forEach((plugin) => {
    if (plugin) {
      const { constructor } = plugin;
      const { name } = constructor;

      if (DEFAULT_EXCLUDE_MERGE_PLUGINS_NAMES.includes(name)) {
        mergedPlugins.push(plugin);

        return;
      }

      const foundSamePluginIndex = mergedPlugins.findIndex(
        (mergedPlugin) => name === mergedPlugin.constructor.name
      );

      if (foundSamePluginIndex !== -1) {
        const mergePluginWithoutConstructor = plugin;
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

export const removePlugin = (
  plugins: Plugin[],
  RemovePluginClass
): Plugin[] => {
  const removePluginInstance = new RemovePluginClass();

  return plugins.filter(
    (plugin) =>
      plugin.constructor.name !== removePluginInstance.constructor.name
  );
};

export const addPlugin = (config: Config, plugins: Plugin[]): Config => ({
  ...config,
  plugins: [...config.plugins, ...plugins],
});
