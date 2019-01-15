const { basename, join, dirname } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const Dotenv = require('dotenv-webpack');

const { DEVELOPMENT_MODE, PRODUCTION_MODE } = require('./constants');

const devPlugins = ({ templatePath, publicFilesPath, outputPath }) => ([
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(DEVELOPMENT_MODE)
  }),
  new Dotenv(),
  new CopyWebpackPlugin([{ from: publicFilesPath, to: outputPath }]),
  new MiniCssExtractPlugin({
    filename: join('styles', '[name].css')
  }),
  new HtmlWebpackPlugin({
    template: templatePath
  }),
  new ImageminPlugin({
    jpegtran: { progressive: true }
  }),
  new webpack.HotModuleReplacementPlugin()
]);

const prodPlugins = ({ templatePath, publicFilesPath, outputPath }) => ([
  new CleanWebpackPlugin([basename(outputPath)], {
    root: dirname(outputPath)
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(PRODUCTION_MODE)
  }),
  new Dotenv(),
  new CopyWebpackPlugin([{ from: publicFilesPath, to: outputPath }]),
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
  new ImageminPlugin({
    jpegtran: { progressive: true }
  }),
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: 'bundle-analyzer-report.html',
    openAnalyzer: false
  })
]);

module.exports = {
  devPlugins,
  prodPlugins
};
