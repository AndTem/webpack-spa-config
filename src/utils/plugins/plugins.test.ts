import { deepMergePlugins } from './plugins';

class Plugin1 {
  value: Record<string, any>;

  constructor(value) {
    this.value = value;
  }
}

class Plugin2 {
  value: Record<string, any>;

  constructor(value) {
    this.value = value;
  }
}

class Plugin3 {
  value: Record<string, any>;

  constructor(value) {
    this.value = value;
  }
}

describe('deepMergePlugins', () => {
  it('merges two plugins based on constructor information', () => {
    const plugins1 = [
      new Plugin1({ data: 'data', enable: true }),
      new Plugin2({ test: 'test' })
    ];
    const plugins2 = [new Plugin1({ data: 'data', enable: false })];
    const expectPlugins = [
      new Plugin1({ data: 'data', enable: false }),
      new Plugin2({ test: 'test' })
    ];

    expect(deepMergePlugins(plugins1, plugins2)).toEqual(expectPlugins);
  });

  it('combines more than two plugins, preserving the order of the first array', () => {
    const plugins1 = [
      new Plugin1({ data: 'data', enable: true }),
      new Plugin2({ test: 'test' }),
      new Plugin3({ test: 'test' })
    ];
    const plugins2 = [
      new Plugin3({ test: 'test' }),
      new Plugin1({ data: 'data', enable: false })
    ];
    const plugins3 = [new Plugin1({ data: 'data', enable: false })];
    const expectPlugins = [
      new Plugin1({ data: 'data', enable: false }),
      new Plugin2({ test: 'test' }),
      new Plugin3({ test: 'test' })
    ];

    expect(deepMergePlugins(plugins1, plugins2, plugins3)).toEqual(
      expectPlugins
    );
  });

  it('deeply merges plugins', () => {
    const plugins1 = [
      new Plugin1({
        data: {
          a: 2,
          b: { data: 'data' },
          c: 'test'
        },
        enable: true
      }),
      new Plugin2({ test: 'test' })
    ];
    const plugins2 = [
      new Plugin2({ test: 'test' }),
      new Plugin1({
        data: {
          a: 3,
          b: { data: 'test', test: 'test' }
        },
        enable: false,
        add: true
      })
    ];
    const expectPlugins = [
      new Plugin1({
        data: {
          a: 3,
          b: { data: 'test', test: 'test' },
          c: 'test'
        },
        enable: false,
        add: true
      }),
      new Plugin2({ test: 'test' })
    ];

    expect(deepMergePlugins(plugins1, plugins2)).toEqual(expectPlugins);
  });
});
