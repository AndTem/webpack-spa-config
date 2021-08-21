import {
  ModifyConfigFunc,
  isProduction,
  Mode,
  compose,
  addPlugins,
} from '@webpackon/core';
import { withBabel } from '@webpackon/babel';
import { withCss } from '@webpackon/css';
import { withImages } from '@webpackon/images';
import { withFonts } from '@webpackon/fonts';
import { withHtmlTemplate } from '@webpackon/html';
import { withDevServer } from '@webpackon/dev-server';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';

import path from 'path';

import { AdditionalEntryParams } from '../entry';

const getDefaultOutput = (mode: Mode) => ({
  publicPath: '/',
  filename: isProduction(mode) ? '[name].[hash].bundle.js' : '[name].bundle.js',
  path: path.join(process.cwd(), 'build'),
  assetModuleFilename: 'static/[hash][ext][query]',
  clean: isProduction(mode),
});

const DEFAULT_RESOLVE = {
  modules: ['node_modules'],
  extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.less'],
};

export const modifyAllConfigs: ModifyConfigFunc<AdditionalEntryParams> = (
  _,
  context
) => {
  const {
    entry,
    output,
    resolve,
    mode,
    transpileModules,
    enableJSX,
    htmlTitle,
    templatePath,
    dev,
  } = context;
  const { useLocalIp, autoOpen } = dev || {};

  const baseConfig = {
    target: 'web',

    entry,

    output: output || getDefaultOutput(mode),

    resolve: resolve || DEFAULT_RESOLVE,
  };

  const modifyConfigs = compose(
    withDevServer({
      mode,
      useLocalIp,
      open: autoOpen,
      outputPath: typeof output === 'string' ? output : output.path,
    }),
    withFonts(),
    withImages({ mode }),
    withCss({ mode }),
    withBabel({ transpileModules, enableJSX }),
    withHtmlTemplate({ mode, title: htmlTitle, templatePath }),
    addPlugins([new CaseSensitivePathsPlugin()])
  );

  return modifyConfigs(baseConfig);
};
