import {
  createLoader,
  LoaderCreatorParams,
  Mode,
  isProduction,
} from '@webpackon/core';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

type CssLoaderAddParams = {
  mode: Mode;
  options?: Record<string, any>;
};

export type CssLoaderOptions = LoaderCreatorParams<CssLoaderAddParams>;

export const createCssLoader = createLoader<CssLoaderOptions>(
  ({ options, mode }) => ({
    test: /\.css$/,
    use: [
      isProduction(mode) ? MiniCssExtractPlugin.loader : 'style-loader',
      { loader: 'css-loader', options: { importLoaders: 1, ...options } },
    ],
  })
);
