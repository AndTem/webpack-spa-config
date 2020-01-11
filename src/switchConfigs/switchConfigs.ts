import { AddConfigFunction, Config } from 'src/types/config';
import { createDevConfig, createProdConfig } from 'src/configs';

import { isDevelopment } from 'src/utils/mode';

import { EntryParams } from 'src/types/entryParams';

const mockAddConfigFunction: AddConfigFunction = () => ({});

const switchConfigs = (_, { mode }) => (entryParams: EntryParams): Config => {
  const requiredParams = {
    mode,
    addToAllConfigs: mockAddConfigFunction,
    addToDevConfig: mockAddConfigFunction,
    addToProdConfig: mockAddConfigFunction,
    ...entryParams
  };

  if (isDevelopment(mode)) {
    return createDevConfig(requiredParams);
  }

  return createProdConfig(requiredParams);
};

export { switchConfigs };
