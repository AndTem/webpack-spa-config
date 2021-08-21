import {
  PRODUCTION_MODE,
  DEVELOPMENT_MODE,
  LEGACY_MODE
} from '../../constants/mode';

import { getFilePathDependingMode, addCompatibilityPrefixToName } from './url';

describe('getFilePathDependingMode', () => {
  const outputDirectoryName = 'images';

  it('if it does not work in prod, then a hash is added to the file name', () => {
    expect(getFilePathDependingMode(PRODUCTION_MODE, outputDirectoryName)).toBe(
      'images/[name].[hash].[ext]'
    );
  });

  it('if it does not work in prod, then only the file name is used', () => {
    expect(
      getFilePathDependingMode(DEVELOPMENT_MODE, outputDirectoryName)
    ).toBe('images/[name].[ext]');
  });
});

describe('addCompatibilityPrefixToName', () => {
  it('add compatibility mode name to filename', () => {
    expect(addCompatibilityPrefixToName(LEGACY_MODE, 'scripts')).toBe(
      'legacy.scripts'
    );
  });
});
