import { createLoader } from '../../utils/loaders';

import { createStyleLoaderItem, createPostCssLoaderItem } from './loaderItems';

const createCssLoader = createLoader(({ mode }) => ({
  test: /\.css$/,
  use: [
    createStyleLoaderItem(mode),
    { loader: 'css-loader', options: { importLoaders: 1 } },
    createPostCssLoaderItem(mode),
  ],
}));

export default createCssLoader;
