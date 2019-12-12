import { Mode } from './mode';
import { EntryParams } from './entryParams';

export type Config = Record<string, any>;

type AddConfigFunctionParams = {
  mode: Mode;
};

// obtained from input parameters
export type AddConfigFunction = (params: AddConfigFunctionParams) => Config;

export type CreateMainConfig = (entryParams: EntryParams) => Config;
