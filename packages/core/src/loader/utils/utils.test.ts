import { smartMergeLoaders } from './utils';

describe('smartMergeLoaders', () => {
  it('replaces identical loaders', () => {
    const loaders1 = [
      {
        test: /test/,
        use: ['loader1'],
      },
      {
        test: /test1/,
        use: ['loader2'],
      },
    ];
    const loaders2 = [
      {
        test: /test/,
        use: ['replace loader'],
      },
    ];

    expect(smartMergeLoaders(loaders1, loaders2)).toEqual([
      {
        test: /test/,
        use: ['replace loader'],
      },
      {
        test: /test1/,
        use: ['loader2'],
      },
    ]);
  });

  it('adds a new loader to the end', () => {
    const loaders1 = [
      {
        test: /test/,
        use: ['loader1'],
      },
      {
        test: /test1/,
        use: ['loader2'],
      },
    ];
    const loaders2 = [
      {
        test: /test2/,
        use: ['loader3'],
      },
    ];

    expect(smartMergeLoaders(loaders1, loaders2)).toEqual([
      ...loaders1,
      ...loaders2,
    ]);
  });
});
