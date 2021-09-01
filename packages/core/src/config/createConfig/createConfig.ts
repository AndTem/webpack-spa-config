import { Mode } from '../../mode';
import { Config } from '../types';
import { CreateConfigParams, Context } from './types';

const mockModifyConfig = (config) => config;

export const createConfig = <AdditionalParams extends Record<string, any>>(
  baseConfig: Config,
  entryParams: CreateConfigParams<AdditionalParams>,
  mode: Mode
) => {
  const { modify = mockModifyConfig } = entryParams;

  const context: Context<AdditionalParams> = { ...entryParams, mode };

  return modify(baseConfig, context);
};
