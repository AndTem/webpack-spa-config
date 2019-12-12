import { Loader } from 'src/types/loaders';
import { Mode } from 'src/types/mode';

type LoaderCreatorParams<AdditionalParams = {}> = {
  mode: Mode;
} & Partial<Loader> &
  AdditionalParams;

type LoaderCreator<AdditionalParams = {}> = (
  params: LoaderCreatorParams<AdditionalParams>
) => Loader;

function createLoader<AdditionalParams>(
  loaderCreator: LoaderCreator<AdditionalParams>
) {
  return (params: LoaderCreatorParams<AdditionalParams>): Loader => {
    const { test, exclude } = params;

    return { test, exclude, ...loaderCreator(params) };
  };
}

export { createLoader };
