const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const flexbugsFixes = require('postcss-flexbugs-fixes');

const { isProduction } = require('../utils/mode');

const postCssLoaderItem = mode => {
  const loaderItem = {
    loader: 'postcss-loader',
    options: {
      plugins: [flexbugsFixes()]
    }
  };

  if (isProduction(mode)) {
    loaderItem.options.plugins.push(autoprefixer());
  }

  return loaderItem;
};

const cssLoader = ({ mode, compatibilityMode }) => ({
  test: /\.css$/,
  use: [
    isProduction(mode) ? MiniCssExtractPlugin.loader : 'style-loader',
    { loader: 'css-loader', options: { importLoaders: 1 } },
    postCssLoaderItem(mode)
  ]
});

const sassLoader = ({ mode, compatibilityMode }) => ({
  test: /\.scss$/,
  use: [
    isProduction(mode) ? MiniCssExtractPlugin.loader : 'style-loader',
    'css-loader',
    postCssLoaderItem(mode),
    'sass-loader'
  ]
});

module.exports = {
  cssLoader,
  sassLoader
};
