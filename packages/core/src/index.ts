export { createLoader, addLoaders, LoaderCreatorParams } from './loader';
export { addPlugins, Plugin } from './plugin';
export {
  createConfigDecorator,
  createConfig,
  CreateConfigParams,
  Context,
  ModifyConfigFunc,
} from './config';
export { Mode, isProduction, isDevelopment } from './mode';
export {
  compose,
  getExcludePackagesRegexp,
  getIncludePackagesRegexp,
} from './common/utils';
