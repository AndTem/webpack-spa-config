import { DEVELOPMENT_MODE, PRODUCTION_MODE } from 'src/constants/mode';

import { connectConfigs } from './config';

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

describe('connectConfigs', () => {
  it('deep merges two configs', () => {
    const config1 = {
      mode: DEVELOPMENT_MODE,
      devtool: 'eval-source-map',
      devServer: {
        contentBase: '/',
        open: true,
        hot: true,
        host: '0.0.0.0',
        useLocalIp: true,
        historyApiFallback: true,
        options: { test: 1 }
      }
    };
    const config2 = {
      mode: PRODUCTION_MODE,
      devServer: {
        open: false,
        options: { test: 1, enable: true }
      }
    };

    const expectConfig = {
      mode: PRODUCTION_MODE,
      devtool: 'eval-source-map',
      devServer: {
        contentBase: '/',
        open: false,
        hot: true,
        host: '0.0.0.0',
        useLocalIp: true,
        historyApiFallback: true,
        options: { test: 1, enable: true }
      }
    };

    expect(connectConfigs(config1, config2)).toEqual(expectConfig);
  });

  it('replace loaders on testRegExp', () => {
    const config1 = {
      module: {
        rules: [
          {
            test: /test/,
            use: [
              'thread-loader',
              { loader: 'babel-loader', options: { test: 'test' } }
            ]
          },
          {
            test: /test1/,
            use: [
              'thread-loader',
              { loader: 'babel-loader', options: { test: 'test' } }
            ]
          }
        ]
      }
    };
    const config2 = {
      module: {
        rules: [
          {
            test: /test/,
            use: [
              'thread-loader',
              { loader: 'babel-loader', options: { data: 'data' } },
              'my-loader'
            ]
          },
          {
            test: /test1/,
            use: [
              'thread-loader',
              { loader: 'babel-loader', options: { test: 'test' } }
            ]
          }
        ]
      }
    };

    const expectConfig = {
      module: config2.module
    };

    expect(connectConfigs(config1, config2)).toEqual(expectConfig);
  });

  it('merge plugins with replace', () => {
    const config1 = {
      plugins: [new Plugin1({ data: 'data' }), new Plugin2({ test: 'test' })]
    };
    const config2 = {
      plugins: [new Plugin2({ data: 'data' }), new Plugin1({ test: 'test' })]
    };

    const expectConfig = {
      plugins: [new Plugin1({ test: 'test' }), new Plugin2({ data: 'data' })]
    };

    expect(connectConfigs(config1, config2)).toEqual(expectConfig);
  });

  it('deep merges more than two configs', () => {
    const config1 = {
      output: {
        a: 2,
        b: { test: 'test' }
      }
    };
    const config2 = {
      output: {
        a: 2,
        b: { test: 'data', enable: true },
        c: 3
      }
    };
    const config3 = {
      output: {
        a: 2,
        b: { test: 'data', enable: true },
        c: 4,
        d: 5
      }
    };

    const expectConfig = {
      output: {
        a: 2,
        b: { test: 'data', enable: true },
        c: 4,
        d: 5
      }
    };

    expect(connectConfigs(config1, config2, config3)).toEqual(expectConfig);
  });
});
