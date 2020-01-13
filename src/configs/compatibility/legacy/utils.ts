import WebpackManifestPlugin from 'webpack-manifest-plugin';

import { Config } from 'src/types/config';

import LaunchModernBuildPlugin from './launchModernBuildPlugin';

import { LEGACY_MANIFEST_NAME } from '../constants';

const addLegacyPlugins = (
  legacyConfig: Config,
  modernConfig: Config
): Config => ({
  ...legacyConfig,
  plugins: [
    ...legacyConfig.plugins,
    new WebpackManifestPlugin({ fileName: LEGACY_MANIFEST_NAME }),
    new LaunchModernBuildPlugin({ modernConfig })
  ]
});

export { addLegacyPlugins };
