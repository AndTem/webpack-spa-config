const { basename, dirname, join } = require('path');

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LegacyInjectHtmlPlugin = require('../legacyInjectHtmlPlugin');

const { isLegacyMode } = require('../../src/utils/mode/mode');
const { getCompatibilityFileName } = require('./utils');

const { PRODUCTION_MODE, LEGACY_MODE, MODERN_MODE } = require('../../src/constants');

const LEGACY_MANIFEST_NAME = 'legacy.manifest.json';
const STYLE_FILE_NAME = '[hash].css';

const getLegacyPlugins = ({ outputPath }) => ([
  new CleanWebpackPlugin([basename(outputPath)], {
    root: dirname(outputPath)
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(PRODUCTION_MODE)
  }),
  new CaseSensitivePathsPlugin(),
  new MiniCssExtractPlugin({
    filename: join('styles', getCompatibilityFileName(LEGACY_MODE, STYLE_FILE_NAME))
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
  new MiniCssExtractPlugin({
    filename: join('styles', getCompatibilityFileName(MODERN_MODE, STYLE_FILE_NAME))
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