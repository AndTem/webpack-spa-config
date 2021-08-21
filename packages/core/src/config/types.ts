import webpack from 'webpack';

export type Config = webpack.Configuration & {
  devServer?: Record<string, unknown>;
};
