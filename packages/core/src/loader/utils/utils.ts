import { Loader } from '../types';
import { Config } from '../../config';

export const addLoaders =
  (loaders: Loader[]) =>
  (config: Config): Config => ({
    ...config,
    module: {
      rules: [...config.module.rules, ...loaders],
    },
  });
