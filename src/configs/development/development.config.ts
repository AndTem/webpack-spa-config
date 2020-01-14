import { CreateMainConfig } from 'src/types/config';

import { connectConfigs } from 'src/utils/config';

import { createCommonConfig } from 'src/configs/common';

import { createDevPlugins } from './plugins';

const createDevConfig: CreateMainConfig = ({
  mode,
  compatibilityMode,
  basicParams,
  addToAllConfigs,
  addToDevConfig
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
      historyApiFallback: true
    },
    plugins: createDevPlugins({ templatePath, mode })
  };

  return connectConfigs(
    createCommonConfig({ ...basicParams, mode }),
    devBaseOptions,
    addToAllConfigs({ mode, compatibilityMode }),
    addToDevConfig({ mode, compatibilityMode })
  );
};

export { createDevConfig };
