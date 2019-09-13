const commonPlugins = [
  '@babel/plugin-transform-runtime',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-class-properties'
];

const commonPresets = ['@babel/preset-react'];

const corejs = 3;

module.exports = {
  env: {
    // This is the config we'll use to generate bundles for legacy browsers.
    legacy: {
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'usage',
            corejs,
            exclude: ['transform-async-to-generator', 'transform-regenerator']
          }
        ],
        ...commonPresets
      ],
      plugins: [...commonPlugins, ['module:fast-async', { spec: true }]]
    },
    // This is the config we'll use to generate bundles for modern browsers.
    modern: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            useBuiltIns: 'usage',
            corejs,
            loose: true,
            targets: {
              // This will target browsers which support ES modules.
              esmodules: true
            }
          }
        ],
        ...commonPresets
      ],
      plugins: commonPlugins
    },
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: true
            },
            modules: 'commonjs'
          }
        ]
      ]
    }
  },
  // default config
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs,
        loose: true,
        targets: {
          // This will target browsers which support ES modules.
          esmodules: true
        }
      }
    ],
    ...commonPresets
  ],
  plugins: commonPlugins
};
