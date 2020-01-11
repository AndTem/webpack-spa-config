import { CommonConfigParams } from 'src/configs/common';

import { AddConfigFunction } from './config';

export type BasicEntryParams = Omit<CommonConfigParams, 'mode'> & {
  templatePath: string;
};

export type EntryParams = {
  basicParams: BasicEntryParams;
  addToAllConfigs?: AddConfigFunction;
  addToDevConfig?: AddConfigFunction;
  addToProdConfig?: AddConfigFunction;
};
