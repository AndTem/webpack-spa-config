import { Loader } from '../types';

export type LoaderCreatorParams<AdditionalParams = {}> = Partial<
  Pick<Loader, 'test' | 'exclude'>
> &
  AdditionalParams;

export function createLoader<AdditionalParams>(
  loaderCreator: (params: LoaderCreatorParams<AdditionalParams>) => Loader
) {
  return (params: LoaderCreatorParams<AdditionalParams>): Loader => {
    const { test, exclude } = params;
    const loader = loaderCreator(params);

    return {
      ...loader,
      test: test || loader.test,
      exclude: exclude || loader.exclude,
    };
  };
}
