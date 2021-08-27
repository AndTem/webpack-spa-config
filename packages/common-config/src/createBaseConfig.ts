import { createConfig } from '@webpackon/core';

import { EntryParams, AdditionalEntryParams } from './entry';
import { modifyAllConfigs } from './modifyAllConfigs';

export const createBaseConfig =
  (entryParams: EntryParams) =>
  (_, { mode }) => {
    // TODO: подумать над необходимостью modifyAll...
    const baseConfig = createConfig<AdditionalEntryParams>(
      {},
      {
        ...entryParams,
        modifyAll: modifyAllConfigs,
      },
      mode
    );

    return createConfig<AdditionalEntryParams>(baseConfig, entryParams, mode);
  };
