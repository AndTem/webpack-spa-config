import { Plugin } from '../types';
import { Config } from '../../config';

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

export const addPlugins =
  (plugins: Plugin[]) =>
  (config: Config): Config => ({
    ...config,
    plugins: [...config.plugins, ...plugins],
  });
