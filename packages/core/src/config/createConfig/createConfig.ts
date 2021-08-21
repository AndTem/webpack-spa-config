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
    modifyAll = mockModifyConfig,
    modifyDev = mockModifyConfig,
    modifyProd = mockModifyConfig,
  } = entryParams;

  const context: Context<AdditionalParams> = { ...entryParams, mode };

  const commonConfig = modifyAll(baseConfig, context);

  if (isDevelopment(mode)) {
    return modifyDev(commonConfig, context);
  }

  return modifyProd(commonConfig, context);
};
