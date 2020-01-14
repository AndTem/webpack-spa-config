import { Loader } from 'src/types/loaders';
import { Mode } from 'src/types/mode';
import { flat } from '../array';

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

const findLoader = (requiredLoaderTest: RegExp) => ({ test }) =>
  String(test) === String(requiredLoaderTest);

const smartMergeLoaders = (...loadersLists: Array<Loader[]>): Loader[] => {
  const allLoaders = flat(loadersLists);

  return allLoaders.reduce((mergedLoaders, currentLoader) => {
    const { test: currentLoaderTest } = currentLoader;
    const foundSameLoaderIndex = mergedLoaders.findIndex(
      findLoader(currentLoaderTest)
    );

    if (foundSameLoaderIndex !== -1) {
      return [
        ...mergedLoaders.slice(0, foundSameLoaderIndex),
        currentLoader,
        ...mergedLoaders.slice(foundSameLoaderIndex + 1, mergedLoaders.length)
      ];
    }

    return [...mergedLoaders, currentLoader];
  }, []);
};

export { createLoader, smartMergeLoaders };
