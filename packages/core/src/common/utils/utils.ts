import { compose as ramdaCompose } from 'ramda';
import { Config } from '../../config';

type ComposeConfig = (config: Config) => Config;

export const compose = (...funcs: ComposeConfig[]): ComposeConfig =>
  (ramdaCompose as any)(...funcs);
