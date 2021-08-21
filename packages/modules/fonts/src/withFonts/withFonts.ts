import { createConfigDecorator, addLoaders } from '@webpackon/core';

import { FontsLoaderOptions, createFontsLoader } from '../fontsLoader';

type WithFontsParams = {
  loaderParams?: FontsLoaderOptions;
};

export const withFonts = createConfigDecorator<WithFontsParams, false>(
  (config, { loaderParams } = {}) =>
    addLoaders([createFontsLoader(loaderParams)])(config)
);
