import { Config } from '../types';
import { Mode } from '../../mode';

export type ModifyConfigFunc<AdditionalParams extends Record<string, any>> = (
  config: Config,
  context: Context<AdditionalParams>
) => Config;

export type CreateConfigParams<AdditionalParams extends Record<string, any>> =
  AdditionalParams & {
    modifyAllConfigs?: ModifyConfigFunc<AdditionalParams>;
    modifyDevConfig?: ModifyConfigFunc<AdditionalParams>;
    modifyProdConfig?: ModifyConfigFunc<AdditionalParams>;
  };

export type Context<AdditionalParams extends Record<string, any>> = Omit<
  CreateConfigParams<AdditionalParams>,
  'modifyAllConfigs' | 'modifyDevConfig' | 'modifyProdConfig'
> & {
  mode: Mode;
} & AdditionalParams;
