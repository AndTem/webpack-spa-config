import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { removePlugin } from '../../../utils/plugins';
import { connectConfigs } from '../../../utils/config';

import { MODERN_MODE } from '../../../constants/mode';

import { CreateMainConfig } from '../../../types/config';

import { createProdConfig } from '../../production';

const createModernProdConfig: CreateMainConfig = (entryParams) => {
  const prodConfig = createProdConfig({
    ...entryParams,
    compatibilityMode: MODERN_MODE,
  });

  return connectConfigs(
    {
      ...prodConfig,
      plugins: removePlugin(prodConfig.plugins, CleanWebpackPlugin),
    },
    {
      plugins: [
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: 'modern.bundle-report.html',
          openAnalyzer: false,
        }),
      ],
    }
  );
};

export { createModernProdConfig };
