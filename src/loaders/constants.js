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

module.exports = {
  IMAGE_LOADER_OPTIONS
};
