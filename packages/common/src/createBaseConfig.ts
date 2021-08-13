import { createConfig } from '@webpackon/core';

import { EntryParams, AdditionalEntryParams } from './entry';

export const createBaseConfig =
  (entryParams: EntryParams) =>
  (_, { mode }) => {
    const baseConfig1 = createConfig<AdditionalEntryParams>(
      {},
      {
        ...entryParams,
        modifyDevConfig: (c) => c,
        modifyAllConfigs: (c) => c,
        modifyProdConfig: (c) => c,
      },
      mode
    );

    return createConfig<AdditionalEntryParams>(baseConfig1, entryParams, mode);
  };
