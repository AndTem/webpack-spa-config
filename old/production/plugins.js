const { basename, join, dirname } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const { PRODUCTION_MODE } = require('../../src/constants');

const prodPlugins = ({ templatePath, publicFilesPath, outputPath }) => [
  new CleanWebpackPlugin([basename(outputPath)], {
    root: dirname(outputPath)
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(PRODUCTION_MODE)
  }),
  new CaseSensitivePathsPlugin(),
  new webpack.HashedModuleIdsPlugin({
    hashFunction: 'md4',
    hashDigest: 'base64',
    hashDigestLength: 4
  }),
  new MiniCssExtractPlugin({
    filename: join('styles', '[hash].css')
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
];

module.exports = prodPlugins;
