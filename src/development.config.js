const merge = require('webpack-merge');

const commonConfig = require('./common.config');

const { devPlugins } = require('./plugins');

const { mergePlugins } = require('./utils');

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
      plugins: mergePlugins(devPlugins(commonConfigParams), plugins)
    }
  );
};
