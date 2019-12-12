import * as path from 'path';
import * as webpack from 'webpack';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { BasicEntryParams } from 'src/types/entryParams';

import { createPluginsList } from 'src/utils/plugins';

type AdditionalParams = Pick<BasicEntryParams, 'outputPath' | 'templatePath'>;

const createProdPlugins = createPluginsList<AdditionalParams>(
  ({ outputPath, templatePath }) => [
    new CleanWebpackPlugin({
      root: path.dirname(outputPath)
    }),
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
