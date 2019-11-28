import { PRODUCTION_MODE, DEVELOPMENT_MODE } from 'src/constants/mode';

import { getFileNameDependingEnv } from './url';

describe('getFileNameDependingEnv', () => {
  const outputDirectoryName = 'images';

  it('if it does not work in prod, then a hash is added to the file name', () => {
    expect(getFileNameDependingEnv(PRODUCTION_MODE, outputDirectoryName)).toBe(
      'images/[name].[hash].[ext]'
    );
  });

  it('if it does not work in prod, then only the file name is used', () => {
    expect(getFileNameDependingEnv(DEVELOPMENT_MODE, outputDirectoryName)).toBe(
      'images/[name].[ext]'
    );
  });
});
