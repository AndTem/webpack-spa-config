import { createDevConfig, createProdConfig } from 'src/configs';

import { isDevelopment } from 'src/utils/mode';

import { EntryParams } from 'src/types/entryParams';
import { Config } from 'src/types/config';

const switchConfigs = (entryParams: EntryParams): Config => {
  const { mode } = entryParams;

  if (isDevelopment(mode)) {
    return createDevConfig(entryParams);
  }

  return createProdConfig(entryParams);
};

export { switchConfigs };
