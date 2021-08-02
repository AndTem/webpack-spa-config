import autoprefixer from 'autoprefixer';
import flexbugsFixes from 'postcss-flexbugs-fixes';

import { Mode } from '../../../types/mode';
import { WebpackLoader } from '../../../types/loaders';

import { isProduction } from '../../../utils/mode';

const createPostCssLoaderItem = (mode: Mode): WebpackLoader => {
  const loaderItem = {
    loader: 'postcss-loader',
    options: {
      plugins: [flexbugsFixes()],
    },
  };

  if (isProduction(mode)) {
    loaderItem.options.plugins.push(autoprefixer());
  }

  return loaderItem;
};

export { createPostCssLoaderItem };
