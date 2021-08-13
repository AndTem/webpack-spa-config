import { isDevelopment, Mode } from '../../mode';
import { Config } from '../types';
import { CreateConfigParams, Context } from './types';

const mockModifyConfig = (config) => config;

export const createConfig = <AdditionalParams extends Record<string, any>>(
  baseConfig: Config,
  entryParams: CreateConfigParams<AdditionalParams>,
  mode: Mode
) => {
  const {
    modifyAllConfigs = mockModifyConfig,
    modifyDevConfig = mockModifyConfig,
    modifyProdConfig = mockModifyConfig,
  } = entryParams;

  const context: Context<AdditionalParams> = { ...entryParams, mode };

  const commonConfig = modifyAllConfigs(baseConfig, context);

  if (isDevelopment(mode)) {
    return modifyDevConfig(commonConfig, context);
  }

  return modifyProdConfig(commonConfig, context);
};
