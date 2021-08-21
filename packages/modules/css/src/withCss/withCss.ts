import {
  createConfigDecorator,
  addLoaders,
  Mode,
  isProduction,
  Plugin,
  compose,
  addPlugins,
} from '@webpackon/core';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
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
    const modifyConfig = compose(
      addLoaders([
        createCssLoader({ mode, ...cssLoaderParams }),
        createPostCssLoader({
          mode,
          plugins: postCssPlugins,
          ...postCssLoaderOptions,
        }),
      ]),
      addPlugins([getMiniCssExtractPlugin(mode)])
    );

    return modifyConfig({
      ...config,
      optimization: {
        ...config.optimization,
        minimizer: [
          ...config.optimization.minimizer,
          new OptimizeCSSAssetsPlugin(),
        ],
      },
    });
  }
);
