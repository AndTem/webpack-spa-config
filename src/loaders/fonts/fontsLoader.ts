import { createLoader } from 'src/utils/loaders';
import { getFileNameDependingEnv } from 'src/utils/url';

export type FontsLoaderAddParams = {
  outputDirectoryName?: string;
};

const DEFAULT_IMAGE_OUTPUT_DIRECTORY_NAME = 'fonts';

const createFontsLoader = createLoader<FontsLoaderAddParams>(
  ({ mode, outputDirectoryName = DEFAULT_IMAGE_OUTPUT_DIRECTORY_NAME }) => {
    return {
      test: /\.(otf|eot|ttf|woff|woff2)(\?.+)?$/,
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
  }
);

export default createFontsLoader;