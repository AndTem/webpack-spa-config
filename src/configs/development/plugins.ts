import path from 'path';
import webpack from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { createPluginsList } from 'src/utils/plugins';

import { BasicEntryParams } from 'src/types/entryParams';

type CreateDevPluginsAddParams = Pick<BasicEntryParams, 'templatePath'>;

const createDevPlugins = createPluginsList<CreateDevPluginsAddParams>(
  ({ templatePath }) => [
    new CaseSensitivePathsPlugin(),
    new MiniCssExtractPlugin({ filename: path.join('styles', '[name].css') }),
    new HtmlWebpackPlugin({ template: templatePath }),
    new webpack.HotModuleReplacementPlugin()
  ]
);

export { createDevPlugins };
