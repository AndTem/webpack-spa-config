const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const flexbugsFixes = require('postcss-flexbugs-fixes');

const { urlLoaderFileName, isProduction } = require('./utils');

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
    {
      loader: 'postcss-loader',
      options: {
        plugins: [
          flexbugsFixes(),
          autoprefixer()
        ]
      }
    }
  ]
});

const sassLoader = mode => ({
  test: /\.scss$/,
  use: [
    isProduction(mode) ? MiniCssExtractPlugin.loader : 'style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        plugins: [
          flexbugsFixes(),
          autoprefixer()
        ]
      }
    },
    'sass-loader'
  ]
});

const imagesLoader = ({ mode, outputDirectoryName = 'images', exclude }) => ({
  test: /\.(png|jpg|jpeg|gif|webp)$/i,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 60,
        name: urlLoaderFileName(mode, outputDirectoryName)
      }
    },
    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: {
          progressive: true
        },
        optipng: {
          optimizationLevel: 3
        }
      }
    }
  ],
  exclude
});

const svgLoader = ({ mode, outputDirectoryName = 'images', exclude }) => ({
  test: /\.svg$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        outputPath: outputDirectoryName,
        name: `[name]${isProduction(mode) ? '.[hash]' : ''}.svg`
      }
    },
    'image-webpack-loader'
  ],
  exclude
});

const svgSpriteLoader = () => ({
  test: /\.svg$/,
  use: ['svg-sprite-loader']
});

const fontsLoader = (mode, outputDirectoryName = 'fonts') => ({
  test: /\.(otf|eot|ttf|woff|woff2)(\?.+)?$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 2048,
        name: urlLoaderFileName(mode, outputDirectoryName)
      }
    }
  ]
});

module.exports = {
  babelLoader,
  cssLoader,
  sassLoader,
  imagesLoader,
  svgLoader,
  svgSpriteLoader,
  fontsLoader
};
