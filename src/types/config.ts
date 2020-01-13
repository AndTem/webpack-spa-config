import { Mode, CompatibilityMode } from './mode';
import { EntryParams } from './entryParams';

export type Config = Record<string, any>;

type AddConfigFunctionParams = {
  mode: Mode;
  compatibilityMode?: CompatibilityMode;
};

type CreateMainConfigParams = Required<EntryParams> & {
  mode: Mode;
  compatibilityMode?: CompatibilityMode;
};

// obtained from input parameters
export type AddConfigFunction = (params: AddConfigFunctionParams) => Config;

export type CreateMainConfig = (entryParams: CreateMainConfigParams) => Config;
