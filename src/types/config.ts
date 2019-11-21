import { Mode } from './mode';
import { BasicEntryParams } from './entryParams';

export type Config = Record<string, any>;

type AddConfigFunctionParams = {
  mode: Mode;
};

// obtained from input parameters
export type AddConfigFunction = (params: AddConfigFunctionParams) => Config;

export type CreateMainConfig = (
  basicParams: BasicEntryParams,
  addsConfigsFunctions: {
    addToAllConfigs: AddConfigFunction;
    addToDevConfig: AddConfigFunction;
    addToProdConfig: AddConfigFunction;
  }
) => Config | void;
