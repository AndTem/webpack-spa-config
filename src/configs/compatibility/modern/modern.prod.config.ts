import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import { findPluginPredicate } from 'src/utils/plugins';

import { CreateMainConfig } from 'src/types/config';

import { createProdConfig } from '../../production';

const createModernProdConfig: CreateMainConfig = entryParams => {
  const prodConfig = createProdConfig(entryParams);

  return {
    ...prodConfig,
    plugins: prodConfig.plugins.filter(findPluginPredicate(CleanWebpackPlugin))
  };
};

export { createModernProdConfig };
