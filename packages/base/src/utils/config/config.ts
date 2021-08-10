import merge from 'webpack-merge';

import { mergePlugins } from '../plugins';
import { smartMergeLoaders } from '../loaders';

import { Config } from '../../types/config';

const connectConfigs = (...connectedConfigs: Config[]): Config =>
  connectedConfigs.reduce((connectedConfig, additionalConfig) => {
    const { plugins: connectedPlugins, module: connectedModule } =
      connectedConfig;
    const { plugins: additionalPlugins, module: additionalModule } =
      additionalConfig;

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
