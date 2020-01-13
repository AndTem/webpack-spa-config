import webpack from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';

import { createPluginsList } from 'src/utils/plugins';

const createLegacyDevPlugins = createPluginsList(() => [
  new CaseSensitivePathsPlugin(),
  new webpack.HotModuleReplacementPlugin()
]);

export { createLegacyDevPlugins };
