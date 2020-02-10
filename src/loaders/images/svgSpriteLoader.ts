import { createLoader } from 'src/utils/loaders';
import { isProduction } from 'src/utils/mode';

export type SvgSpriteLoaderAddParams = {
  extractInProd?: boolean;
  options?: Record<string, Record<string, any>>;
  optimizationOptions?: Record<string, Record<string, any>>;
};

const createSvgSpriteLoader = createLoader<SvgSpriteLoaderAddParams>(
  ({ mode, extractInProd = true, test, options, optimizationOptions }) => {
    const loader = {
      test,
      use: [
        {
          loader: 'svg-sprite-loader',
          options: {
            extract: extractInProd ? isProduction(mode) : false,
            spriteFilename: 'sprite.[hash].svg',
            ...options
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
