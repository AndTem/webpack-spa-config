import { AddConfigFunction, Config } from 'src/types/config';
import {
  createDevConfig,
  createProdConfig,
  createCompatibilityConfig
} from 'src/configs';

import { isDevelopment } from 'src/utils/mode';

import { EntryParams } from 'src/types/entryParams';

const mockAddConfigFunction: AddConfigFunction = () => ({});

const switchConfigs = (entryParams: EntryParams) => (_, { mode }): Config => {
  const requiredParams = {
    mode,
    addToAllConfigs: mockAddConfigFunction,
    addToDevConfig: mockAddConfigFunction,
    addToProdConfig: mockAddConfigFunction,
    ...entryParams
  };

  if (process.env.COMPATIBILITY) {
    return createCompatibilityConfig(requiredParams);
  }

  if (isDevelopment(mode)) {
    return createDevConfig(requiredParams);
  }

  return createProdConfig(requiredParams);
};

export { switchConfigs };
