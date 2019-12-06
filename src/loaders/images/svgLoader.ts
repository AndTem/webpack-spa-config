import { createLoader } from 'src/utils/loaders';
import { isProduction } from 'src/utils/mode';
import { getFileNameDependingEnv } from 'src/utils/url';

export type SvgLoaderAddParams = {
  optimizationOptions?: Record<string, Record<string, any>>;
  outputDirectoryName?: string;
};

const DEFAULT_IMAGE_OUTPUT_DIRECTORY_NAME = 'images';

// TODO: add loader ID for merge
const createSvgLoader = createLoader<SvgLoaderAddParams>(
  ({
    mode,
    outputDirectoryName = DEFAULT_IMAGE_OUTPUT_DIRECTORY_NAME,
    optimizationOptions
  }) => {
    const loader = {
      test: /\.svg$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            outputPath: outputDirectoryName,
            name: getFileNameDependingEnv(mode, outputDirectoryName)
          }
        }
      ]
    };

    if (isProduction(mode)) {
      loader.use.push({
        loader: 'image-webpack-loader',
        options: optimizationOptions as any
      });
    }

    return loader;
  }
);

export default createSvgLoader;
