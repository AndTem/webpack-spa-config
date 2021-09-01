import { createConfig } from '@webpackon/core';

import { EntryParams, AdditionalEntryParams } from './entry';
import { modify } from './modify';

export const createBaseConfig =
  (entryParams: EntryParams) =>
  (_, { mode }) => {
    const baseConfig = createConfig<AdditionalEntryParams>(
      {},
      {
        ...entryParams,
        modify,
      },
      mode
    );

    return createConfig<AdditionalEntryParams>(baseConfig, entryParams, mode);
  };
