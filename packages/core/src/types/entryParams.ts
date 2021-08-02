import { CommonConfigParams } from '../configs/common';

import { Mode } from './mode';

import { AddConfigFunction } from './config';

export type BasicEntryParams = Omit<
  CommonConfigParams,
  'mode' | 'compatibilityMode'
> & {
  templatePath: string;
};

export type EntryParams = {
  mode: Mode;
  basicParams: BasicEntryParams;
  addToAllConfigs?: AddConfigFunction;
  addToDevConfig?: AddConfigFunction;
  addToProdConfig?: AddConfigFunction;
};
