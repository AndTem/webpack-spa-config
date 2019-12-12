import { CreateMainConfig } from 'src/types/config';

import { connectConfigs } from 'src/utils/config';

import { createCommonConfig } from 'src/configs/common';

import { PRODUCTION_MODE } from 'src/constants/mode';

import { createDefaultOptimization } from './optimization';
import { createProdPlugins } from './plugins';

const createProdConfig: CreateMainConfig = ({
  basicParams,
  addToAllConfigs,
  addToProdConfig
}) => {
  const prodBaseOptions = {
    mode: PRODUCTION_MODE,
    optimization: createDefaultOptimization(),
    plugins: createProdPlugins({ ...basicParams, mode: PRODUCTION_MODE })
  };

  return connectConfigs(
    createCommonConfig({ ...basicParams, mode: PRODUCTION_MODE }),
    prodBaseOptions,
    addToAllConfigs({ mode: PRODUCTION_MODE }),
    addToProdConfig({ mode: PRODUCTION_MODE })
  );
};

export { createProdConfig };
