import webpack from 'webpack';

import { Mode } from '../mode';

export type Config = webpack.Configuration;

type AddConfigFunctionParams = {
  mode: Mode;
};

// obtained from input parameters
export type AddConfigFunction = (params: AddConfigFunctionParams) => Config;
