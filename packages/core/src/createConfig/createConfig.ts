import { AddConfigFunction, Config } from '../config/config';
import {
  createDevConfig,
  createProdConfig,
  createCompatibilityConfig,
} from '../configs';

import { isDevelopment } from '../mode/mode';

import { EntryParams } from '../types/entryParams';

const mockAddConfigFunction: AddConfigFunction = () => ({});

export const createConfig =
  (entryParams: EntryParams) =>
  (_, { mode }): Config => {
    const requiredParams = {
      mode,
      modifyAllConfigs: mockAddConfigFunction,
      modifyDevConfig: mockAddConfigFunction,
      modifyProdConfig: mockAddConfigFunction,
      ...entryParams,
    };

    if (process.env.COMPATIBILITY) {
      return createCompatibilityConfig(requiredParams);
    }

    if (isDevelopment(mode)) {
      return createDevConfig(requiredParams);
    }

    return createProdConfig(requiredParams);
  };
