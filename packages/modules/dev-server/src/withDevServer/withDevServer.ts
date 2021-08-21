import webpack from 'webpack';
import {
  createConfigDecorator,
  Mode,
  isProduction,
  addPlugins,
} from '@webpackon/core';

type WithDevServerParams = {
  mode: Mode;
  outputPath: string;
  open?: boolean;
  useLocalIp?: boolean;
};

export const withDevServer = createConfigDecorator<WithDevServerParams, true>(
  (config, { mode, outputPath, open = false, useLocalIp = false }) => {
    if (isProduction(mode)) return config;

    const modifyConfig = addPlugins([new webpack.HotModuleReplacementPlugin()]);

    return modifyConfig({
      ...config,
      devtool: 'eval-source-map',
      devServer: {
        contentBase: outputPath,
        host: useLocalIp ? 'local-ip' : undefined,
        open,
        hot: true,
        historyApiFallback: true,
      },
    });
  }
);
