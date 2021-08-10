import { Loader } from '../types';
import { Config } from '../../config/config';

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

export const addLoader = (config: Config, loader: Loader): Config => ({
  ...config,
  module: {
    rules: [...config.module.rules, loader],
  },
});
