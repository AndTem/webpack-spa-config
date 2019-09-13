const { isProduction } = require('../utils/mode');
const { urlLoaderFileName } = require('../utils/url');

const { IMAGE_LOADER_OPTIONS } = require('./constants');

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

module.exports = {
  imagesLoader,
  svgLoader,
  svgSpriteLoader
};
