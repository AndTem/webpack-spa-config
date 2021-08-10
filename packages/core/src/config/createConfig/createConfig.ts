import { isDevelopment, Mode } from '../../mode';
import { Config } from '../types';
import { CreateConfigParams, ModifyConfigFunc, Context } from './types';

const mockModifyConfig: ModifyConfigFunc = (config) => config;

export const createConfig = (
  baseConfig: Config,
  entryParams: CreateConfigParams,
  mode: Mode
) => {
  const {
    modifyAllConfigs = mockModifyConfig,
    modifyDevConfig = mockModifyConfig,
    modifyProdConfig = mockModifyConfig,
  } = entryParams;

  const context: Context = { ...entryParams, mode };

  const commonConfig = modifyAllConfigs(baseConfig, context);

  if (isDevelopment(mode)) {
    return modifyDevConfig(commonConfig, context);
  }

  return modifyProdConfig(commonConfig, context);
};
