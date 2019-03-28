const DEVELOPMENT_MODE = 'development';
const PRODUCTION_MODE = 'production';

const LEGACY_MODE = 'legacy';
const MODERN_MODE = 'modern';

const IMAGE_LOADER_OPTIONS = {
  options: {
    mozjpeg: {
      progressive: true,
      quality: 90
    },
    optipng: {
      optimizationLevel: 3
    },
    pngquant: {
      enabled: false
    }
  }
};

const DEFAULT_VENDOR_NAME = '[chunkhash].vendors.js';

const JS_REGEXP = /\.js$/;

module.exports = {
  DEVELOPMENT_MODE,
  PRODUCTION_MODE,
  LEGACY_MODE,
  MODERN_MODE,
  IMAGE_LOADER_OPTIONS,
  DEFAULT_VENDOR_NAME,
  JS_REGEXP
};
