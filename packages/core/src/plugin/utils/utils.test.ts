// eslint-disable-next-line max-classes-per-file
import { Plugin } from '../types';

import { removePlugin } from './utils';

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

describe('removePlugin', () => {
  it('removes the passed plugin', () => {
    const plugins: Plugin[] = [new Plugin1({}), new Plugin2({})] as any;

    expect(removePlugin(plugins, Plugin2)).toEqual([new Plugin1({})]);
  });
});
