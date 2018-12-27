const merge = require('webpack-merge');

const commonConfig = require('./common.config');
const { mergeArray } = require('./utils');
const { devPlugins } = require('./plugins');

const { DEVELOPMENT_MODE } = require('./constants');

module.exports = (commonConfigParams, additionalOptions) => {
  const { outputPath } = commonConfigParams;
  const { plugins } = additionalOptions;

  return merge(
    commonConfig({ ...commonConfigParams, mode: DEVELOPMENT_MODE }),
    {
      mode: DEVELOPMENT_MODE,
      devtool: 'eval-source-map',
      devServer: {
        contentBase: outputPath,
        hot: true
      },
      ...additionalOptions,
      plugins: mergeArray(devPlugins(commonConfigParams), plugins)
    }
  );
};
