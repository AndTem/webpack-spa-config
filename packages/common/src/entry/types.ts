import webpack from 'webpack';
import { CreateConfigParams } from '@webpackon/core';

export type AdditionalEntryParams = {
  entry: webpack.Entry;
  output?: webpack.WebpackOptionsNormalized;
  resolve?: webpack.ResolveOptions;
  transpileModules?: string[];
};

export type EntryParams = CreateConfigParams<AdditionalEntryParams>;
