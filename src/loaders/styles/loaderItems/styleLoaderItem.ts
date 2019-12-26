import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { Mode } from '../../../types/mode';
import { WebpackLoader } from '../../../types/loaders';

import { isProduction } from '../../../utils/mode';

const createStyleLoaderItem = (mode: Mode): WebpackLoader =>
  isProduction(mode) ? MiniCssExtractPlugin.loader : 'style-loader';

export { createStyleLoaderItem };
