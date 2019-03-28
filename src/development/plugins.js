const { join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const { DEVELOPMENT_MODE } = require('./constants');

const devPlugins = ({ templatePath, publicFilesPath, outputPath }) => ([
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(DEVELOPMENT_MODE)
  }),
  new CaseSensitivePathsPlugin(),
  new Dotenv(),
  new CopyWebpackPlugin([{ from: publicFilesPath, to: outputPath }]),
  new MiniCssExtractPlugin({
    filename: join('styles', '[name].css')
  }),
  new HtmlWebpackPlugin({
    template: templatePath
  }),
  new webpack.HotModuleReplacementPlugin()
]);

module.exports = devPlugins;
