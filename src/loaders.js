const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { isProduction } = require('./utils');

const babelLoader = () => ({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: ['babel-loader']
});

const cssLoader = mode => ({
  test: /\.css$/,
  use: [
    isProduction(mode) ? MiniCssExtractPlugin.loader : 'style-loader',
    { loader: 'css-loader', options: { importLoaders: 1 } },
    'postcss-loader'
  ]
});

const sassLoader = mode => ({
  test: /\.scss$/,
  use: [
    isProduction(mode) ? MiniCssExtractPlugin.loader : 'style-loader',
    'css-loader',
    'sass-loader'
  ]
});

const imagesLoader = (outputDirectoryName = 'images') => ({
  test: /\.(png|jpg|gif)$/i,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 600,
        name: outputDirectoryName
      }
    },
    {
      loader: 'file-loader',
      options: {
        outputPath: outputDirectoryName
      }
    }
  ]
});

const svgSpriteLoader = () => ({
  test: /\.svg$/,
  use: ['svg-sprite-loader']
});

const fontsLoader = (outputDirectoryName = 'fonts') => ({
  test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)?$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 2048,
        name: outputDirectoryName
      }
    }
  ]
});

module.exports = {
  babelLoader,
  cssLoader,
  sassLoader,
  imagesLoader,
  svgSpriteLoader,
  fontsLoader
};
