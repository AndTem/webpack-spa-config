import { createLoader, LoaderCreatorParams } from '@webpackon/core';

type ImagesLoaderAddParams = {
  generator?: Record<string, any>;
};

export type ImagesLoaderOptions = LoaderCreatorParams<ImagesLoaderAddParams>;

export const createImagesLoader = createLoader<ImagesLoaderOptions>(
  ({ generator }) => ({
    test: /\.(png|jpg|jpeg|gif|webp|svg)$/i,
    type: 'asset/resource',
    generator,
  })
);
