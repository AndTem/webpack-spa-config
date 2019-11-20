const productionConfig = require('../production/production.config');

const { babelLoader } = require('../../loaders');

const { mergePlugins, mergeConfigOptions } = require('../../utils/merge');
const { getCompatibilityFileName } = require('./utils');

const { getCompatibilityPlugins } = require('./plugins');

module.exports = (compatibilityMode, commonConfigParams, additionalOptions) => {
  const { plugins: additionalPlugins } = additionalOptions;
  const compatibilityPlugins = getCompatibilityPlugins({
    ...commonConfigParams,
    compatibilityMode
  });
  const compatibilityRules = {
    module: {
      rules: [
        babelLoader({ envName: compatibilityMode })
      ]
    }
  };

  return productionConfig(
    {
      ...commonConfigParams,
      // add prefix compatibility mode
      scriptsFileName: getCompatibilityFileName(compatibilityMode),
    },
    {
      // add babel env. 'legacy' || 'modern'
      ...mergeConfigOptions(additionalOptions, compatibilityRules),
      plugins: mergePlugins(compatibilityPlugins, additionalPlugins)
    },
    compatibilityMode
  );
};
