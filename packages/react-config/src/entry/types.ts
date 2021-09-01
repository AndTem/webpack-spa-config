import { CreateConfigParams } from '@webpackon/core';
import { AdditionalEntryParams as BaseConfigAdditionalEntryParams } from '@webpackon/base-config';

export type AdditionalEntryParams = Omit<
  BaseConfigAdditionalEntryParams,
  'disableDefaultBabelLoader'
> & { useTs?: boolean };

export type EntryParams = CreateConfigParams<AdditionalEntryParams>;
