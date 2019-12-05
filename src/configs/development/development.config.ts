import { CreateMainConfig } from 'src/types/config';

import { connectConfigs } from 'src/utils/config';

import { createCommonConfig } from 'src/configs/common';

import { DEVELOPMENT_MODE } from 'src/constants/mode';

import { createDevPlugins } from './plugins';

const createDevConfig: CreateMainConfig = ({
  basicParams,
  addToAllConfigs,
  addToDevConfig
}) => {
  const { outputPath, templatePath } = basicParams;

  const devBaseOptions = {
    mode: DEVELOPMENT_MODE,
    devtool: 'eval-source-map',
    devServer: {
      contentBase: outputPath,
      open: true,
      hot: true,
      useLocalIp: true,
      historyApiFallback: true
    },
    plugins: createDevPlugins({ templatePath, mode: DEVELOPMENT_MODE })
  };

  return connectConfigs(
    createCommonConfig({ ...basicParams, mode: DEVELOPMENT_MODE }),
    devBaseOptions,
    addToAllConfigs({ mode: DEVELOPMENT_MODE }),
    addToDevConfig({ mode: DEVELOPMENT_MODE })
  );
};

export { createDevConfig };
