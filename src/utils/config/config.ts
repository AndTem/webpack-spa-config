import merge from 'webpack-merge';

import { mergePlugins } from 'src/utils/plugins';

import { Config } from 'src/types/config';

const CONNECT_CONFIGS_MERGE_STRATEGY = {
  'module.rules': 'replace'
};

const connectConfigs = (...connectedConfigs: Config[]): Config =>
  connectedConfigs.reduce((connectedConfig, additionalConfig) => {
    const { plugins: connectedPlugins } = connectedConfig;
    const { plugins: additionalPlugins } = additionalConfig;

    const newConfig = merge.smartStrategy(CONNECT_CONFIGS_MERGE_STRATEGY)(
      connectedConfig,
      additionalConfig
    );

    if (connectedPlugins && additionalPlugins) {
      newConfig.plugins = mergePlugins(connectedPlugins, additionalPlugins);
    }

    return newConfig;
  });

export { connectConfigs };
