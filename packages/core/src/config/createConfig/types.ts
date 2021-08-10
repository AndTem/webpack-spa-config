import webpack from 'webpack';
import { Config } from '../types';
import { Mode } from '../../mode';

export type ModifyConfigFunc = (config: Config, context: Context) => Config;

export type CreateConfigParams = {
  entry: webpack.Entry;
  output: webpack.WebpackOptionsNormalized;
  modifyAllConfigs?: ModifyConfigFunc;
  modifyDevConfig?: ModifyConfigFunc;
  modifyProdConfig?: ModifyConfigFunc;
};

export type Context = Pick<CreateConfigParams, 'entry' | 'output'> & {
  mode: Mode;
};
