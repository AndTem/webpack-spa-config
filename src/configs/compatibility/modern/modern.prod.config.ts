import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { removePlugin } from 'src/utils/plugins';
import { connectConfigs } from 'src/utils/config';

import { MODERN_MODE } from 'src/constants/mode';

import { CreateMainConfig } from 'src/types/config';

import { createProdConfig } from '../../production';

const createModernProdConfig: CreateMainConfig = entryParams => {
  const prodConfig = createProdConfig({
    ...entryParams,
    compatibilityMode: MODERN_MODE
  });

  return connectConfigs(
    {
      ...prodConfig,
      plugins: removePlugin(prodConfig.plugins, CleanWebpackPlugin)
    },
    {
      plugins: [
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: 'modern.bundle-report.html',
          openAnalyzer: false
        })
      ]
    }
  );
};

export { createModernProdConfig };
