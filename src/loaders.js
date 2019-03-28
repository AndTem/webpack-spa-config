const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const flexbugsFixes = require('postcss-flexbugs-fixes');

const { isProduction } = require('./utils/mode');
const { urlLoaderFileName } = require('./utils/url');

const { IMAGE_LOADER_OPTIONS } = require('./constants');

const babelLoader = options => ({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options
  }
});

const cssLoader = ({ mode, compatibilityMode }) => {
  const loader = {
    test: /\.css$/,
    use: [
      isProduction(mode) ? MiniCssExtractPlugin.loader : 'style-loader',
      { loader: 'css-loader', options: { importLoaders: 1 } },
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            flexbugsFixes()
          ]
        }
      }
    ]
  };

  if (isProduction(mode)) {
    loader.use[2].options.plugins.push(autoprefixer());
  }
};

const sassLoader = ({ mode, compatibilityMode }) => {
  const loader = {
    test: /\.scss$/,
    use: [
      isProduction(mode) ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            flexbugsFixes()
          ]
        }
      },
      'sass-loader'
    ]
  }

  if (isProduction(mode)) {
    loader.use[2].options.plugins.push(autoprefixer());
  }
};

const imagesLoader = ({
  mode,
  compatibilityMode,
  outputDirectoryName = 'images',
  exclude
}) => {
  const loader = {
    test: /\.(png|jpg|jpeg|gif|webp)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 60,
          // [name] || [hash]
          name: urlLoaderFileName(mode, outputDirectoryName)
        }
      }
    ],
    exclude
  };

  if (isProduction(mode)) {
    loader.use.push({
      loader: 'image-webpack-loader',
      options: IMAGE_LOADER_OPTIONS
    });
  }

  return loader;
};

const svgLoader = ({
  mode,
  compatibilityMode,
  outputDirectoryName = 'images',
  exclude
}) => {
  const loader = {
    test: /\.svg$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          outputPath: outputDirectoryName,
          name: `[name]${isProduction(mode) ? '.[hash]' : ''}.svg`
        }
      }
    ],
    exclude
  };

  if (isProduction(mode)) loader.use.push('image-webpack-loader');

  return loader;
};

const svgSpriteLoader = ({ mode, compatibilityMode, testRegexp }) => {
  const loader = {
    test: testRegexp,
    use: [
      {
        loader: 'svg-sprite-loader',
        options: {
          extract: isProduction(mode)
        }
      }
    ]
  };

  if (isProduction(mode)) loader.use.push('image-webpack-loader');

  return loader;
};

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
