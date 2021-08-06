import { createLoader } from '../../utils/loaders';
import { isProduction } from '../../utils/mode';
import { getFilePathDependingMode } from '../../utils/url';

export type ImagesLoaderAddParams = {
  optimizationOptions?: Record<string, Record<string, any>>;
  outputDirectoryName?: string;
};

const DEFAULT_IMAGE_OUTPUT_DIRECTORY_NAME = 'images';

const DEFAULT_OPTIMIZATION_OPTIONS = {
  mozjpeg: {
    progressive: true,
    quality: 90,
  },
  optipng: {
    optimizationLevel: 3,
  },
  pngquant: {
    enabled: false,
  },
};

const createCommonImagesLoader = createLoader<ImagesLoaderAddParams>(
  ({
    mode,
    outputDirectoryName = DEFAULT_IMAGE_OUTPUT_DIRECTORY_NAME,
    optimizationOptions = DEFAULT_OPTIMIZATION_OPTIONS,
  }) => {
    const loader = {
      test: /\.(png|jpg|jpeg|gif|webp)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 60,
            // [name] || [hash]
            name: getFilePathDependingMode(mode, outputDirectoryName),
          },
        },
      ],
    };

    if (isProduction(mode)) {
      loader.use.push({
        loader: 'image-webpack-loader',
        options: optimizationOptions as any,
      });
    }

    return loader;
  }
);

export default createCommonImagesLoader;
