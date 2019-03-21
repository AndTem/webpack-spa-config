const DEVELOPMENT_MODE = 'development';
const PRODUCTION_MODE = 'production';

const IMAGE_LOADER_OPTIONS = {
  options: {
    mozjpeg: {
      progressive: true,
      quality: 90
    },
    optipng: {
      optimizationLevel: 3
    },
    // pngquant not work windows
    pngquant: {
      enabled: false
    }
  }
};

module.exports = {
  DEVELOPMENT_MODE,
  PRODUCTION_MODE,
  IMAGE_LOADER_OPTIONS
};
