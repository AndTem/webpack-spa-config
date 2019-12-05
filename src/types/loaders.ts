export type WebpackLoader =
  | { loader: string; options: Record<string, any> }
  | string;

export type Loader = {
  test: RegExp;
  use: Array<WebpackLoader>;
  exclude?: RegExp | string[];
};
