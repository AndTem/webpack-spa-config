import { createLoader } from 'src/utils/loaders';

import { createStyleLoaderItem, createPostCssLoaderItem } from './loaderItems';

const createSassLoader = createLoader(({ mode }) => {
  return {
    test: /\.css$/,
    use: [
      createStyleLoaderItem(mode),
      { loader: 'css-loader', options: { importLoaders: 1 } },
      createPostCssLoaderItem(mode)
    ]
  };
});

export default createSassLoader;
