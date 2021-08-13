import { DEVELOPMENT_MODE } from '../../constants/mode';
import { Mode } from '../../types/mode';

import { createLoader, smartMergeLoaders } from './loaders';

describe('createLoader', () => {
  it('creates a loader based on the passed loaderCreator', () => {
    const testLoader = createLoader(() => ({ test: /test/, use: [] }));
    const expectLoader = {
      test: /test/,
      use: []
    };

    expect(testLoader({ mode: DEVELOPMENT_MODE })).toEqual(expectLoader);
  });

  it('by default adds parameters (test, exclude) to the loader if there are any', () => {
    const testLoader = createLoader(({ test }) => ({ test, use: [] }));
    const exclude = ['node_modules'];
    const testRegExp = /test/;
    const expectLoader = {
      test: testRegExp,
      use: [],
      exclude
    };

    expect(
      testLoader({ test: testRegExp, mode: DEVELOPMENT_MODE, exclude })
    ).toEqual(expectLoader);
  });

  it('createLoader passes all received parameters to loaderCreator', () => {
    type AdditionalParams = {
      a: number;
      b: number;
    };

    const testRegExp = /test/;
    const transmittedParams = {
      test: testRegExp,
      mode: DEVELOPMENT_MODE as Mode,
      a: 2,
      b: 3
    };
    const testLoader = createLoader<AdditionalParams>(params => ({
      test: params.test,
      use: [],
      params
    }));
    const expectLoader = {
      test: testRegExp,
      use: [],
      params: transmittedParams
    };

    expect(testLoader(transmittedParams)).toEqual(expectLoader);
  });
});

describe('smartMergeLoaders', () => {
  it('replaces identical loaders', () => {
    const loaders1 = [
      {
        test: /test/,
        use: ['loader1']
      },
      {
        test: /test1/,
        use: ['loader2']
      }
    ];
    const loaders2 = [
      {
        test: /test/,
        use: ['replace loader']
      }
    ];

    expect(smartMergeLoaders(loaders1, loaders2)).toEqual([
      {
        test: /test/,
        use: ['replace loader']
      },
      {
        test: /test1/,
        use: ['loader2']
      }
    ]);
  });

  it('adds a new loader to the end', () => {
    const loaders1 = [
      {
        test: /test/,
        use: ['loader1']
      },
      {
        test: /test1/,
        use: ['loader2']
      }
    ];
    const loaders2 = [
      {
        test: /test2/,
        use: ['loader3']
      }
    ];

    expect(smartMergeLoaders(loaders1, loaders2)).toEqual([
      ...loaders1,
      ...loaders2
    ]);
  });
});
