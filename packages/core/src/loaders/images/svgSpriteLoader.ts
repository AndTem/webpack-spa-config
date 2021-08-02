import { createLoader } from '../../utils/loaders';
import { isProduction } from '../../utils/mode';

export type SvgSpriteLoaderAddParams = {
  options?: Record<string, Record<string, any>>;
  optimizationOptions?: Record<string, Record<string, any>>;
};

const createSvgSpriteLoader = createLoader<SvgSpriteLoaderAddParams>(
  ({ mode, test, options, optimizationOptions }) => {
    const loader = {
      test,
      use: [
        {
          loader: 'svg-sprite-loader',
          options: {
            extract: true,
            // esModule: true does not work in docker
            esModule: false,
            spriteFilename: 'sprite.[hash].svg',
            ...options,
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

export default createSvgSpriteLoader;
