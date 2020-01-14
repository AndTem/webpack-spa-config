import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { connectConfigs } from 'src/utils/config';

import { CreateMainConfig } from 'src/types/config';

import { createProdConfig } from '../../production';

const createLegacyProdConfig: CreateMainConfig = entryParams =>
  connectConfigs(createProdConfig(entryParams), {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'legacy.bundle-report.html',
        openAnalyzer: false
      })
    ]
  });

export { createLegacyProdConfig };
