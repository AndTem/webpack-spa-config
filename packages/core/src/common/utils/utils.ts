import { compose as ramdaCompose } from 'ramda';
import { Config } from '../../config';

type ComposeConfig = (config: Config) => Config;

export const compose = (...funcs: ComposeConfig[]): ComposeConfig =>
  (ramdaCompose as any)(...funcs);

export const getExcludePackagesRegexp = (
  transpileModules: string[]
): RegExp => {
  const modulesOrRule = transpileModules.join('|');

  const regExpString = `node_modules[\\\\/](?!(${modulesOrRule})).*`;

  return new RegExp(regExpString);
};

export const getIncludePackagesRegexp = (
  transpileModules: string[]
): RegExp => {
  const modulesOrRule = transpileModules.join('|');

  const regExpString = `node_modules[\\\\/](${modulesOrRule}).*`;

  return new RegExp(regExpString);
};
