import { CreateMainConfig } from '../../types/config';

import { connectConfigs } from '../../utils/config';

import { createCommonConfig } from '../common';

import { createDefaultOptimization } from './optimization';
import { createProdPlugins } from './plugins';

const createProdConfig: CreateMainConfig = ({
  mode,
  compatibilityMode,
  basicParams,
  addToAllConfigs,
  addToProdConfig,
}) => {
  const prodBaseOptions = {
    mode,
    optimization: createDefaultOptimization({ compatibilityMode }),
    plugins: createProdPlugins({ ...basicParams, mode }),
  };

  return connectConfigs(
    createCommonConfig({ ...basicParams, mode, compatibilityMode }),
    prodBaseOptions,
    addToAllConfigs({ mode, compatibilityMode }),
    addToProdConfig({ mode, compatibilityMode })
  );
};

export { createProdConfig };
