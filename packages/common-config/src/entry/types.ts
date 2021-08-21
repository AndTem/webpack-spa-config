import webpack from 'webpack';
import { CreateConfigParams } from '@webpackon/core';

export type AdditionalEntryParams = {
  entry: webpack.Entry;
  output?: webpack.WebpackOptionsNormalized['output'];
  resolve?: webpack.ResolveOptions;
  transpileModules?: string[];
  enableJSX?: boolean;
  templatePath?: string;
  htmlTitle?: string;
  dev?: {
    useLocalIp?: boolean;
    autoOpen?: boolean;
  };
};

export type EntryParams = CreateConfigParams<AdditionalEntryParams>;
