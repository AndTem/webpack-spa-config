import { createLoader, LoaderCreatorParams } from '@webpackon/core';

type FontsLoaderAddParams = {
  generator?: Record<string, any>;
};

export type FontsLoaderOptions = LoaderCreatorParams<FontsLoaderAddParams>;

export const createFontsLoader = createLoader<FontsLoaderOptions>(
  ({ generator }) => ({
    test: /\.(otf|eot|ttf|woff|woff2)(\?.+)?$/,
    type: 'asset/resource',
    generator,
  })
);
