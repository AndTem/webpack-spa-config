import { LoaderCreator, LoaderCreatorParams, Loader } from 'src/types/loaders';

function createLoader<AdditionalParams>(
  loaderCreator: LoaderCreator<AdditionalParams>
) {
  return (params: LoaderCreatorParams<AdditionalParams>): Loader => {
    const { test, exclude } = params;

    return { test, exclude, ...loaderCreator(params) };
  };
}

export { createLoader };
