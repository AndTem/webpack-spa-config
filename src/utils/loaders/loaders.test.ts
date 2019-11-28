import { DEVELOPMENT_MODE } from 'src/constants/mode';
import { Mode } from 'src/types/mode';

import { createLoader } from './loaders';

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
