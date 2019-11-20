import { Mode } from './mode';

export type WebpackLoader =
  | { loader: string; options: Record<string, any> }
  | string;

export type Loader = {
  test: RegExp;
  use: Array<WebpackLoader>;
  exclude?: RegExp | string[];
};

export type LoaderCreatorParams<AdditionalParams = {}> = {
  mode: Mode;
  test?: RegExp;
  exclude?: RegExp | string[];
} & AdditionalParams;

export type LoaderCreator<AdditionalParams = {}> = (
  params: LoaderCreatorParams<AdditionalParams>
) => Loader;
