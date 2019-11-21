import { merge } from 'webpack-merge';

import { deepMergePlugins } from 'src/utils/plugins';

import { Config } from 'src/types/config';

const connectConfigs = (...additionalConfigs: Config[]): Config =>
  additionalConfigs.reduce((connectedConfig, additionalConfig) => {
    const { plugins: connectedPlugins } = connectedConfig;
    const { plugins: additionalPlugins } = additionalConfig;

    const newConfig = merge(connectedConfig, additionalConfig);

    if (connectedPlugins && additionalPlugins) {
      newConfig.plugins = deepMergePlugins(connectedPlugins, additionalPlugins);
    }

    return newConfig;
  });

export { connectConfigs };
