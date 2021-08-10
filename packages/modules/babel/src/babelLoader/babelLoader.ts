import { createLoader, LoaderCreatorParams } from '@webpackon/core';

type BabelLoaderAddParams = {
  enableJSX?: boolean;
  transpileModules?: string[];
  options?: Record<string, any>;
};

export type BabelLoaderOptions = LoaderCreatorParams<BabelLoaderAddParams>;

// TODO: перенести функцию в core
const getTranspileModulesRegexp = (
  transpileModules: BabelLoaderAddParams['transpileModules']
): RegExp => {
  const modulesOrRule = transpileModules.join('|');

  const regExpString = `node_modules[\\\\/](?!(${modulesOrRule})).*`;

  return new RegExp(regExpString);
};

export const createBabelLoader = createLoader<BabelLoaderAddParams>(
  ({ options, enableJSX, transpileModules }) => ({
    test: enableJSX ? /\.(js|jsx)$/ : /\.js$/,
    // TODO: подумать как смержить exclude
    exclude: transpileModules
      ? getTranspileModulesRegexp(transpileModules)
      : /node_modules/,
    use: [
      'thread-loader',
      {
        loader: 'babel-loader',
        options,
      },
    ],
  })
);
