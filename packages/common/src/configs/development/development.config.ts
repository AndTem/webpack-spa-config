import { CreateMainConfig } from '../../types/config';

import { connectConfigs } from '../../utils/config';

import { createCommonConfig } from '../common';

import { createDevPlugins } from './plugins';

const createDevConfig: CreateMainConfig = ({
  mode,
  compatibilityMode,
  basicParams,
  addToAllConfigs,
  addToDevConfig,
}) => {
  const { outputPath, templatePath } = basicParams;

  const devBaseOptions = {
    mode,
    devtool: 'eval-source-map',
    devServer: {
      contentBase: outputPath,
      host: '0.0.0.0',
      open: true,
      hot: true,
      useLocalIp: true,
      historyApiFallback: true,
    },
    plugins: createDevPlugins({ templatePath, mode }),
  };

  return connectConfigs(
    createCommonConfig({ ...basicParams, mode, compatibilityMode }),
    devBaseOptions,
    addToAllConfigs({ mode, compatibilityMode }),
    addToDevConfig({ mode, compatibilityMode })
  );
};

export { createDevConfig };
