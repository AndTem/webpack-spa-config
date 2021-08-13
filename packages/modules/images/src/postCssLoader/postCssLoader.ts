import {
  createLoader,
  LoaderCreatorParams,
  Mode,
  isProduction,
} from '@webpackon/core';
import flexbugsFixes from 'postcss-flexbugs-fixes';
import autoprefixer from 'autoprefixer';

type PostCssLoaderAddParams = {
  mode: Mode;
  plugins?: any[];
  options?: Record<string, any>;
};

export type PostCssLoaderOptions = LoaderCreatorParams<PostCssLoaderAddParams>;

export const createPostCssLoader = createLoader<PostCssLoaderOptions>(
  ({ options, plugins = [], mode }) => {
    const resultPlugins = [...plugins, flexbugsFixes()];

    if (isProduction(mode)) {
      resultPlugins.push(autoprefixer());
    }

    return {
      test: /\.css$/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            plugins: resultPlugins,
            ...options,
          },
        },
      ],
    };
  }
);
