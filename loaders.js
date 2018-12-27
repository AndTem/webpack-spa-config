const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { isProduction } = require('./utils');

const babelLoader = () => ({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: ['babel-loader']
});

const cssLoader = () => ({
  test: /\.css$/,
  use: ['style-loader', 'css-loader']
});

const sassLoader = mode => ({
  test: /\.scss$/,
  use: [
    isProduction(mode) ? MiniCssExtractPlugin.loader : 'style-loader',
    'css-loader',
    'sass-loader'
  ]
});

const imagesLoader = (outputDirectoryPath = 'images') => ({
  test: /\.(png|jpg|gif)$/i,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 600,
        name: outputDirectoryPath
      }
    },
    {
      loader: 'file-loader',
      options: {
        outputPath: outputDirectoryPath
      }
    }
  ]
});

const svgSpriteLoader = () => ({
  test: /\.svg$/,
  use: ['svg-sprite-loader']
});

const fontsLoader = (outputDirectoryPath = 'fonts') => ({
  test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)?$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 2048,
        name: outputDirectoryPath
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
