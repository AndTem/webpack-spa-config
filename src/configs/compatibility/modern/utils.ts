import path from 'path';

import { Config } from 'src/types/config';

import { WebpackPlugin } from 'src/types/plugins';
import LegacyInjectHtmlPlugin from './legacyInjectHtmlPlugin';

import { LEGACY_MANIFEST_NAME } from '../constants';

const transformPluginsToModern = (
  config: Config,
  outputPath: string
): Config => ({
  ...config,
  plugins: [
    ...config.plugins,
    new LegacyInjectHtmlPlugin({
      legacyManifestPath: path.join(outputPath, LEGACY_MANIFEST_NAME)
    })
  ]
});

export { transformPluginsToModern };
