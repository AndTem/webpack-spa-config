import {
  createConfigDecorator,
  addLoaders,
  addPlugins,
  Mode,
  isProduction,
  compose,
} from '@webpackon/core';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';

import { ImagesLoaderOptions, createImagesLoader } from '../imagesLoader';

type WithImagesParams = {
  mode: Mode;
  loaderParams?: ImagesLoaderOptions;
  imageminPlugins?: Array<[string, Record<string, unknown>]>;
};

const DEFAULT_IMAGEMIN_PLUGINS: WithImagesParams['imageminPlugins'] = [
  ['jpegtran', { progressive: true }],
  ['svgo', {}],
];

export const withImages = createConfigDecorator<WithImagesParams, true>(
  (config, { loaderParams, imageminPlugins, mode }) => {
    const prodPlugins = [
      new ImageMinimizerPlugin({
        minimizerOptions: {
          plugins: imageminPlugins || DEFAULT_IMAGEMIN_PLUGINS,
        },
      }),
    ];

    const modifyConfig = compose(
      addPlugins(isProduction(mode) ? prodPlugins : []),
      addLoaders([createImagesLoader(loaderParams)])
    );

    return modifyConfig(config);
  }
);
