import path from 'path';
import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { BasicEntryParams } from 'src/types/entryParams';

import { createPluginsList } from 'src/utils/plugins';

type AdditionalParams = Pick<BasicEntryParams, 'templatePath'>;

const createProdPlugins = createPluginsList<AdditionalParams>(
  ({ templatePath }) => [
    new CleanWebpackPlugin(),
    new CaseSensitivePathsPlugin(),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'md4',
      hashDigest: 'base64',
      hashDigestLength: 4
    }),
    new MiniCssExtractPlugin({
      filename: path.join('styles', '[hash].css')
    }),
    new HtmlWebpackPlugin({
      template: templatePath,
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true
      }
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report.html',
      openAnalyzer: false
    })
  ]
);

export { createProdPlugins };
