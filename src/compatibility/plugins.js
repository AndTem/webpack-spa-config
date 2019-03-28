const { basename, dirname, join } = require('path');

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LegacyInjectHtmlPlugin = require('../legacyInjectHtmlPlugin');

const { isLegacyMode } = require('../utils/mode');

const { PRODUCTION_MODE } = require('../constants');

const LEGACY_MANIFEST_NAME = 'legacy.manifest.json';

const getLegacyPlugins = ({ outputPath }) => ([
  new CleanWebpackPlugin([basename(outputPath)], {
    root: dirname(outputPath)
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(PRODUCTION_MODE)
  }),
  new CaseSensitivePathsPlugin(),
  new Dotenv(),
  new MiniCssExtractPlugin({
    filename: join('styles', '[hash].css')
  }),
  new WebpackManifestPlugin({
    fileName: LEGACY_MANIFEST_NAME
  }),
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: 'legacy-bundle-report.html',
    openAnalyzer: false
  })
]);

const getModernPlugins = ({ templatePath, outputPath }) => ([
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(PRODUCTION_MODE)
  }),
  new CaseSensitivePathsPlugin(),
  new Dotenv(),
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
  new LegacyInjectHtmlPlugin({
    manifestPath: join(outputPath, LEGACY_MANIFEST_NAME)
  }),
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: 'modern-bundle-report.html',
    openAnalyzer: false
  })
]);

const getCompatibilityPlugins = ({ compatibilityMode, outputPath, templatePath }) => {
  if (isLegacyMode(compatibilityMode)) {
    return getLegacyPlugins({ outputPath });
  }

  return getModernPlugins({ templatePath, outputPath });
};

module.exports = {
  getCompatibilityPlugins
};
