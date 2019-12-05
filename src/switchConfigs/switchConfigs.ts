import { createDevConfig } from 'src/configs';

import { isDevelopment } from 'src/utils/mode';

import { EntryParams } from 'src/types/entryParams';
import { Config } from 'src/types/config';

const switchConfigs = (entryParams: EntryParams): Config | void => {
  const { mode } = entryParams;

  if (isDevelopment(mode)) {
    return createDevConfig(entryParams);
  }
};

// const devConfig = require('./configs/development/development.config');
// const prodConfig = require('./configs/production/production.config');
// const compatibilityConfig = require('./configs/compatibility/compatibility.config');
//
// const { mergeConfigOptions } = require('./utils/merge');
// const { isDevelopment, isProduction } = require('./utils/mode/mode');

// module.exports = ({
//   mode,
//   basicParams,
//   addToAllConfigs = defaultOptionsFunc,
//   addToDevConfig = defaultOptionsFunc,
//   addToProdConfig = defaultOptionsFunc
// }: EntryParams) => {
//   if (isDevelopment(mode)) {
//     return devConfig(
//       basicParams,
//       mergeConfigOptions(commonOptions(mode), devOptions(mode))
//     );
//   }
//
//   if (isProduction(mode)) {
//     return prodConfig(
//       basicParams,
//       mergeConfigOptions(commonOptions(mode), prodOptions(mode))
//     );
//   }
//
//   // if not development or production that compatibility
//   compatibilityConfig(basicParams, commonOptions, prodOptions);
// };

export { switchConfigs };
