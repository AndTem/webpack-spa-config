import webpack from 'webpack';

import { DEVELOPMENT_MODE } from 'src/constants/mode';

import { Mode } from 'src/types/mode';

import { createPluginsList, mergePlugins, removePlugin } from './plugins';

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

describe('createPluginsList', () => {
  it('adds definePlugin to the list of plugins that will return pluginsListCreator', () => {
    const plugins = [new Plugin1({})];
    const expectPlugins = [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(DEVELOPMENT_MODE)
      }),
      new Plugin1({})
    ];

    const pluginsList = createPluginsList(() => plugins);

    expect(pluginsList({ mode: DEVELOPMENT_MODE })).toEqual(expectPlugins);
  });

  it('passes to creator all passed values ​​with mode', () => {
    const plugins = [new Plugin1({})];
    const params = { mode: DEVELOPMENT_MODE as Mode, outputDirectoryName: '/' };

    const expectPlugins = [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(DEVELOPMENT_MODE)
      }),
      new Plugin1({}),
      params
    ];

    const pluginsList = createPluginsList<{ outputDirectoryName: string }>(
      allParams => [...plugins, allParams]
    );

    expect(pluginsList(params)).toEqual(expectPlugins);
  });
});

describe('mergePlugins', () => {
  it('merges two plugins based on constructor information', () => {
    const plugins1 = [
      new Plugin1({ test: 'test' }),
      new Plugin2({ test: 'test' })
    ];
    const plugins2 = [new Plugin1({ data: 'data', enable: false })];
    const expectPlugins = [
      new Plugin1({ data: 'data', enable: false }),
      new Plugin2({ test: 'test' })
    ];

    expect(mergePlugins(plugins1, plugins2)).toEqual(expectPlugins);
  });

  it('combines more than two plugins, preserving the order of the first array', () => {
    const plugins1 = [
      new Plugin1({ data: 'data', enable: true }),
      new Plugin2({ test: 'test' }),
      new Plugin3({ test: 'test' })
    ];
    const plugins2 = [
      new Plugin3({ data: 'data' }),
      new Plugin1({ data: 'data', enable: false, newData: 'newdata' })
    ];
    const plugins3 = [new Plugin1({ data: 'data', enable: false })];
    const expectPlugins = [
      new Plugin1({ data: 'data', enable: false }),
      new Plugin2({ test: 'test' }),
      new Plugin3({ data: 'data' })
    ];

    expect(mergePlugins(plugins1, plugins2, plugins3)).toEqual(expectPlugins);
  });
});

describe('removePlugin', () => {
  it('removes the passed plugin', () => {
    const plugins = [new Plugin1({}), new Plugin2({})];

    expect(removePlugin(plugins, Plugin2)).toEqual([new Plugin1({})]);
  });
});
