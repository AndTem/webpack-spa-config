import webpack from 'webpack';

export type CreateConfigParams = {
  entry: webpack.Entry;
  output: webpack.WebpackOptionsNormalized;
  publicPath?: string;
  scriptsFileName?: string;
  imagesOutputDirectoryName?: string;
  excludeImages?: RegExp | string[];
  svgSpriteRegExp?: RegExp;
};
