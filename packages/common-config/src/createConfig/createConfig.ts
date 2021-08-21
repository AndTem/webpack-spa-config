import { AddConfigFunction, Config } from '../types/config';
import {
  createDevConfig,
  createProdConfig,
  createCompatibilityConfig,
} from '../configs';

import { isDevelopment } from '../utils/mode';

import { EntryParams } from '../types/entryParams';

const mockAddConfigFunction: AddConfigFunction = () => ({});

export const createConfig =
  (entryParams: EntryParams) =>
  (_, { mode }): Config => {
    const requiredParams = {
      mode,
      modifyAll: mockAddConfigFunction,
      modifyDev: mockAddConfigFunction,
      modifyProd: mockAddConfigFunction,
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
