import { Loader } from '../../types/loaders';
import { Mode } from '../../types/mode';

type LoaderCreatorParams<AdditionalParams = {}> = {
  mode: Mode;
} & Partial<Loader> &
  AdditionalParams;

type LoaderCreator<AdditionalParams = {}> = (
  params: LoaderCreatorParams<AdditionalParams>
) => Loader;

export function createLoader<AdditionalParams>(
  loaderCreator: LoaderCreator<AdditionalParams>
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

const findLoader =
  (requiredLoaderTest: RegExp) =>
  ({ test }) =>
    String(test) === String(requiredLoaderTest);

export const smartMergeLoaders = (
  ...loadersLists: Array<Loader[]>
): Loader[] => {
  const allLoaders = loadersLists.flat();

  return allLoaders.reduce((mergedLoaders, currentLoader) => {
    const { test: currentLoaderTest } = currentLoader;
    const foundSameLoaderIndex = mergedLoaders.findIndex(
      findLoader(currentLoaderTest)
    );

    if (foundSameLoaderIndex !== -1) {
      return [
        ...mergedLoaders.slice(0, foundSameLoaderIndex),
        currentLoader,
        ...mergedLoaders.slice(foundSameLoaderIndex + 1, mergedLoaders.length),
      ];
    }

    return [...mergedLoaders, currentLoader];
  }, []);
};
