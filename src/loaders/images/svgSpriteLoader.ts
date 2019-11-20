import { createLoader } from 'src/utils/loaders';
import { isProduction } from 'src/utils/mode';

export type SvgSpriteLoaderAddParams = {
  optimizationOptions?: Record<string, Record<string, any>>;
};

const createSvgSpriteLoader = createLoader<SvgSpriteLoaderAddParams>(
  ({ mode, test, optimizationOptions }) => {
    const loader = {
      test,
      use: [
        {
          loader: 'svg-sprite-loader',
          options: {
            extract: isProduction(mode)
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

export default createSvgSpriteLoader;
