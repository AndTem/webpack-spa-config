import { createLoader } from 'src/utils/loaders';

import { createStyleLoaderItem, createPostCssLoaderItem } from './loaderItems';

const createSassLoader = createLoader(({ mode }) => {
  return {
    test: /\.scss$/,
    use: [
      createStyleLoaderItem(mode),
      { loader: 'css-loader', options: { importLoaders: 1 } },
      createPostCssLoaderItem(mode),
      'sass-loader'
    ]
  };
});

export default createSassLoader;
