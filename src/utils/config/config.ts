import { merge } from 'webpack-merge';

import { Config } from 'src/types/config';

const connectConfigs = (baseConfig: Config, additionalConfig: Config): Config =>
  merge.smart(baseConfig, additionalConfig);

export { connectConfigs };
