import { CommonConfigParams } from 'src/configs/common';

import { Mode } from './mode';
import { AddConfigFunction } from './config';

export type BasicEntryParams = Omit<CommonConfigParams, 'mode'> & {
  templatePath: string;
};

export type EntryParams = {
  mode: Mode;
  basicParams: BasicEntryParams;
  addToAllConfigs: AddConfigFunction;
  addToDevConfig: AddConfigFunction;
  addToProdConfig: AddConfigFunction;
};
