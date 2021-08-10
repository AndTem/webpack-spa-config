import {
  createConfigDecorator,
  addLoaders,
  Mode,
  isProduction,
  Plugin,
  addPlugin,
} from '@webpackon/core';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';

import { createCssLoader, CssLoaderOptions } from '../cssLoader';
import { createPostCssLoader, PostCssLoaderOptions } from '../postCssLoader';

type WithCssParams = {
  mode: Mode;
  cssLoaderParams?: Partial<CssLoaderOptions>;
  postCssPlugins?: PostCssLoaderOptions['plugins'];
  postCssLoaderOptions?: Partial<PostCssLoaderOptions>;
};

const getMiniCssExtractPlugin = (mode: Mode): Plugin =>
  new MiniCssExtractPlugin({
    filename: path.join(
      'styles',
      isProduction(mode) ? '[hash].css' : '[name].css'
    ),
  });

export const withCss = createConfigDecorator<WithCssParams, true>(
  (config, { cssLoaderParams, mode, postCssPlugins, postCssLoaderOptions }) => {
    const withLoaders = addLoaders(config, [
      createCssLoader({ mode, ...cssLoaderParams }),
      createPostCssLoader({
        mode,
        plugins: postCssPlugins,
        ...postCssLoaderOptions,
      }),
    ]);

    return addPlugin(withLoaders, [getMiniCssExtractPlugin(mode)]);
  }
);
