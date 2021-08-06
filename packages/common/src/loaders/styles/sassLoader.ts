import { createLoader } from '../../utils/loaders';

import { createStyleLoaderItem, createPostCssLoaderItem } from './loaderItems';

const createSassLoader = createLoader(({ mode }) => ({
  test: /\.scss$/,
  use: [
    createStyleLoaderItem(mode),
    { loader: 'css-loader', options: { importLoaders: 1 } },
    createPostCssLoaderItem(mode),
    'sass-loader',
  ],
}));

export default createSassLoader;
