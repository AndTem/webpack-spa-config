import {
  createConfigDecorator,
  addPlugins,
  Mode,
  isProduction,
} from '@webpackon/core';
import HtmlWebpackPlugin, { Options } from 'html-webpack-plugin';

type WithHtmlTemplateParams = {
  mode: Mode;
  title?: string;
  templatePath?: string;
};

const getHtmlWebpackPlugin = ({
  templatePath,
  title,
  mode,
}: WithHtmlTemplateParams) => {
  const options: Options = { template: templatePath, title };

  if (isProduction(mode)) {
    options.minify = {
      collapseWhitespace: true,
      conservativeCollapse: true,
      minifyCSS: true,
      removeComments: true,
    };
  }

  return new HtmlWebpackPlugin(options);
};

export const withHtmlTemplate = createConfigDecorator<
  WithHtmlTemplateParams,
  true
>((config, params) => {
  const modifyConfig = addPlugins([getHtmlWebpackPlugin(params)]);

  return modifyConfig(config);
});
