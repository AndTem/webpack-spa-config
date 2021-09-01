import { createConfig } from '@webpackon/core';
import { createConfig as createBaseConfig } from '@webpackon/base-config';

import { EntryParams, AdditionalEntryParams } from './entry';
import { modify } from './modify';

export const createReactConfig =
  (entryParams: EntryParams) =>
  (_, { mode }) => {
    const baseConfig = createBaseConfig({
      ...entryParams,
      disableDefaultBabelLoader: true,
      modify,
    })({}, { mode });

    return createConfig<AdditionalEntryParams>(baseConfig, entryParams, mode);
  };
