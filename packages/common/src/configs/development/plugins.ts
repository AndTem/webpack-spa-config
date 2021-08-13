import webpack from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { createPluginsList } from '../../utils/plugins';

import { BasicEntryParams } from '../../types/entryParams';

type CreateDevPluginsAddParams = Pick<BasicEntryParams, 'templatePath'>;

const createDevPlugins = createPluginsList<CreateDevPluginsAddParams>(
  ({ templatePath }) => [
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({ template: templatePath }),
    new webpack.HotModuleReplacementPlugin(),
  ]
);

export { createDevPlugins };
