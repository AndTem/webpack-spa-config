const merge = require('webpack-merge');

const commonConfig = require('./common.config');

const { devPlugins } = require('./plugins');

const { mergePlugins } = require('./utils');

const { DEVELOPMENT_MODE } = require('./constants');

module.exports = (commonConfigParams, additionalOptions) => {
  const { outputPath } = commonConfigParams;
  const { plugins } = additionalOptions;

  return merge.smart(
    commonConfig({ ...commonConfigParams, mode: DEVELOPMENT_MODE }),
    {
      ...merge(
        {
          mode: DEVELOPMENT_MODE,
          devtool: 'eval-source-map',
          devServer: {
            contentBase: outputPath,
            open: true,
            hot: true,
            host: '0.0.0.0',
            useLocalIp: true,
            historyApiFallback: true
          }
        },
        additionalOptions
      ),
      plugins: mergePlugins(devPlugins(commonConfigParams), plugins)
    }
  );
};
