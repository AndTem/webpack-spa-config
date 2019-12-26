import { default as merge } from 'webpack-merge';

import { mergePlugins } from 'src/utils/plugins';
import { smartMergeLoaders } from 'src/utils/loaders';

import { Config } from 'src/types/config';

const connectConfigs = (...connectedConfigs: Config[]): Config =>
  connectedConfigs.reduce((connectedConfig, additionalConfig) => {
    const {
      plugins: connectedPlugins,
      module: connectedModule
    } = connectedConfig;
    const {
      plugins: additionalPlugins,
      module: additionalModule
    } = additionalConfig;

    const newConfig = merge(connectedConfig, additionalConfig);

    if ((connectedModule || {}).rules && (additionalModule || {}).rules) {
      newConfig.module.rules = smartMergeLoaders(
        connectedModule.rules,
        additionalModule.rules
      );
    }

    if (connectedPlugins && additionalPlugins) {
      newConfig.plugins = mergePlugins(connectedPlugins, additionalPlugins);
    }

    return newConfig;
  });

export { connectConfigs };
