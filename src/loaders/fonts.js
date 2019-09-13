const { urlLoaderFileName } = require('../utils/url');

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
  fontsLoader
};
