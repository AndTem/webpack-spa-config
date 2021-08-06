import webpack from 'webpack';
import * as path from 'path';

export const DEFAULT_RESOLVE_OPTION: webpack.WebpackOptionsNormalized['resolve'] =
  {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.less'],
  };

export const DEFAULT_OUTPUT_OPTION: webpack.WebpackOptionsNormalized['output'] =
  {
    publicPath: '/',
    filename: '[hash].bundle.js',
    path: path.join(process.cwd(), 'build'),
  };
