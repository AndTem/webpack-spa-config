import { CreateMainConfig } from 'src/types/config';

import { connectConfigs } from 'src/utils/config';

import { createCommonConfig } from 'src/configs/common';

import { PRODUCTION_MODE } from 'src/constants/mode';

import { createDefaultOptimization } from './optimization';
import { createProdPlugins } from './plugins';

const createProdConfig: CreateMainConfig = ({
  mode,
  compatibilityMode,
  basicParams,
  addToAllConfigs,
  addToProdConfig
}) => {
  const prodBaseOptions = {
    mode,
    optimization: createDefaultOptimization({ compatibilityMode }),
    plugins: createProdPlugins({ ...basicParams, mode })
  };

  return connectConfigs(
    createCommonConfig({ ...basicParams, mode }),
    prodBaseOptions,
    addToAllConfigs({ mode, compatibilityMode }),
    addToProdConfig({ mode, compatibilityMode })
  );
};

export { createProdConfig };
