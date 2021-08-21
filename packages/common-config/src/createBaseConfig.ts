import { createConfig } from '@webpackon/core';

import { EntryParams, AdditionalEntryParams } from './entry';
import { modifyAllConfigs } from './modifyAllConfigs';

export const createBaseConfig =
  (entryParams: EntryParams) =>
  (_, { mode }) => {
    const baseConfig = createConfig<AdditionalEntryParams>(
      {},
      {
        ...entryParams,
        modifyDev: (c) => c,
        modifyAll: modifyAllConfigs,
        modifyProd: (c) => c,
      },
      mode
    );

    return createConfig<AdditionalEntryParams>(baseConfig, entryParams, mode);
  };
