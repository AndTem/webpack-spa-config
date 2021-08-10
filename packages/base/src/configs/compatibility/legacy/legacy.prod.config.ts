import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { connectConfigs } from '../../../utils/config';

import { LEGACY_MODE } from '../../../constants/mode';

import { CreateMainConfig } from '../../../types/config';

import { createProdConfig } from '../../production';

const createLegacyProdConfig: CreateMainConfig = (entryParams) =>
  connectConfigs(
    createProdConfig({ ...entryParams, compatibilityMode: LEGACY_MODE }),
    {
      plugins: [
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: 'legacy.bundle-report.html',
          openAnalyzer: false,
        }),
      ],
    }
  );

export { createLegacyProdConfig };
