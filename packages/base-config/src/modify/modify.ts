import path from 'path';

import { ModifyConfigFunc, isProduction, Mode, compose } from '@webpackon/core';
import { withBabel } from '@webpackon/babel';
import { withCss } from '@webpackon/css';
import { withImages } from '@webpackon/images';
import { withFonts } from '@webpackon/fonts';
import { withHtmlTemplate } from '@webpackon/html';
import { withDevServer } from '@webpackon/dev-server';
import { withOptimization } from '@webpackon/optimization';

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

export const modify: ModifyConfigFunc<AdditionalEntryParams> = (_, context) => {
  const {
    entry,
    output,
    resolve,
    mode,
    transpileModules,
    htmlTitle,
    templatePath,
    disableDefaultBabelLoader,
    dev = {},
    production = {},
  } = context;
  const { useLocalIp, autoOpen, proxy } = dev;
  const { dropConsole, splitChunkCacheGroups } = production;

  const baseConfig = {
    target: 'web',

    entry,

    output: output || getDefaultOutput(mode),

    resolve: resolve || DEFAULT_RESOLVE,
  };

  const configModifiers = [
    withDevServer({
      mode,
      useLocalIp,
      proxy,
      open: autoOpen,
      outputPath: typeof output === 'string' ? output : output.path,
    }),
    withFonts(),
    withImages({ mode }),
    withCss({ mode }),
    withHtmlTemplate({ mode, title: htmlTitle, templatePath }),
    withOptimization({ mode, dropConsole, splitChunkCacheGroups }),
  ];

  if (!disableDefaultBabelLoader) {
    configModifiers.push(withBabel({ transpileModules }));
  }

  return compose(...configModifiers)(baseConfig);
};
