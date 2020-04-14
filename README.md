# Webpack SPA Config
Webpack 4 config for SPA.

This configuration has everything you need to build a SPA. Also this configuration is easy to extend and editing.

🔥In this configuration there is "compatibility" mode. It is a separate build for old and new browsers. Js files size for new browsers is reduced by about **11%**.

Full example with output assembly can be seen here - https://github.com/AndTem/webpack-spa-config/tree/master/example.

# Installation
```
npm install --save-dev webpack-spa-config
```

# Minimum config
```
webpack.config.js
```
```js
const { createConfig } = require('webpack-spa-config');

const basicParams = {
  entryPath: resolve(__dirname, 'index.js'),
  outputPath: resolve(__dirname, 'dist'),
  templatePath: resolve(__dirname, 'index.html')
};

module.exports = createConfig({ basicParams });
```

```
package.json
```
```json
...
"scripts": {
  "build": "webpack --mode=production --config webpack.config.js",
  "build-dev": "webpack --mode=development --config webpack.config.js",
  "start": "webpack-dev-server --mode=development"
}
...
```

Don't forget to fill in the browserlist and babel file.


# Default features

## Development mode
  * dev-server, hot replace (host on local ip);
  * babel-loader (js, jsx, ts, tsx);
  * css-loader
  * image-loader - limit: 60. Default output directory - 'images'. Extensions: png|jpg|jpeg|gif|webp;
  * svg-loader - default output directory - 'images';
  * svg-sprite-loader - in development mode injects in runtime;
  * fonts-loader - formats: .otf, .eot, .ttf, .woff, .woff2. Default output directory - 'fonts';
  * define process.env.NODE_ENV;

## Production mode
  * babel-loader (js, jsx);
  * css-loader, postcss (autoprefixer, flexbugs-fixes), minimizes css. Default output directory - 'styles';
  * image-loader - limit: 60. Default output directory - 'images';
  * svg-loader - default output directory - 'images';
  * svg-sprite - in production mode injects in html;
  * default image-webpack-loader minimezes except jpeg (converted to progressive jpeg) and png (optimiztion level - 3);
  * fonts-loader - formats: .otf, .eot, .ttf, .woff, .woff2. Default output directory - 'fonts';
  * minimizes html;
  * split chunks + runtime chunks;
  * removal of the previous assembly before starting a new one in production;
  * checks for duplicate packets (duplicate-package-checker-webpack-plugin)
  * static bundle report (webpack-bundle-analyzer).

## Compatibility mode
  When using this mode, the build size for new browsers is reduced by 11%
  Includes all the features for the selected modification (development|production).

  * it is possible to make a separate babel config for old browsers. Specify in the babel configuration everything that is necessary for old browsers and this will not get into the assembly for new browsers (polyfills);
  * it is possible to make a separate babel config for new browsers. Specify in babel config only what is needed for new browser;
  * sets env name for babel.config;
  * separate reports for each assembly (legacy and modern).

Webpack in compatibility mode injects tags with necessary attributes in html.
```html
<!-- for new browsers. Old browsers not support attribute type="module" -->
<script type="module" src="/modern.545dc46f7bbd77968d14.bundle.js"></script>
<!-- for old browsers. New browsers will ignore the script tag with the nomodule attribute  -->
<script src="/legacy.bc624b7b4b14725030b0.bundle.js" nomodule></script>
```

How to turn on сompatibility mode - **[Compatibility example](#compatibilityExample)**.

# createConfig API
```
const { createConfig } = require('webpack-spa-config');

createConfig(params)
```

Params object is required.

```params```: ```required <Object>```
* ```basicParams```: ```required <Object>```
   * ```entryPath```: ```required <String>```;
   * ```outputPath```: ```required <String>```;
   * ```templatePath```: ```required <String>```. Path to html;
   * ```publicPath```: ```<String> Default value: '/'```. https://webpack.js.org/configuration/output/#outputpublicpath
   * ```imagesOutputDirectoryName```: ```<String> Default value: 'images'```. Names of output images files.;
   * ```excludeImages```: ```<Regexp>```. Exclude images for images loader;
   * ```svgSpriteRegExp```: ```<Regexp>```.

* ```addToAllConfigs```: ```<({ mode, compatibility }) => PartConfig>```:
    * ```mode```: ```required <production | development>```. The current mode will be transmitted;
    * ```compatibilityMode```: ```required <legacy | modern>```. The current compatibility mode will be transmitted;
    * ```PartConfig```: ```required <Object>```. Part of the configuration that will extend the configurations for all modes.
* ```addToDevConfig```: ```<({ mode }) => PartConfig>```:
    * ```mode```: ```required <production | development>```. The current mode will be transmitted;
    * ```compatibilityMode```: ```required <legacy | modern>```. The current compatibility mode will be transmitted;
    * ```PartConfig```: ```required <Object>```. Part of the configuration that will extend the configurations for dev mode.
* ```addToProdConfig```: ```<({ mode }) => PartConfig>```:
    * ```mode```: ```required <production | development>```. The current mode will be transmitted;
    * ```compatibilityMode```: ```required <legacy | modern>```. The current compatibility mode will be transmitted;
    * ```PartConfig```: ```required <Object>```. Part of the configuration that will extend the configurations for prod mode.

# Extending/changing the basic configuration
To expand/change the basic configuration, you must use the following functions: ```addToAllConfigs```, ```addToDevConfig```, ```addToProdConfig```.
For configurations there is a deep merge except for loaders and plugins.

For loaders (```config.module.rules```) and plugins (```config.plugins```) there is a rough replacement.
Loaders are replaced using the **test** field.
Plugins are replaced using the constructor name.

Merging configurations will occur in the following order:
* For dev mode:
   1. merge the **basic configuration** with the object returned by **addToAllConfigs**
   2. merge the config received in the first step with the object that the addToDevConfig function returned
* For prod mode:
   1. merge the **basic configuration** with the object returned by **addToAllConfigs**
   2. merge the config received in the first step with the object that the **addToProdConfig** function returned

There are also ready loaders.

# Svg sprite
Using this configuration, you can generate svg and inject it inside html.
See how to do it [here](#spriteExample).
Full example - https://github.com/AndTem/webpack-spa-config/tree/master/example.

# Loaders
Ready-made loaders can be used.

```
const { babelLoader } = require('webpack-spa-config');
```

All loaders are functions and everyone takes the following general parameters:
```ts
{
  mode: 'development' | 'production';
  test?: RegExp;
  exclude?: RegExp | string[];
}
```

For all loaders you can change the parameters described above

## Scripts loaders

### babelLoader({ mode, test, exclude, options })
Params:
```ts
{
  mode: 'development' | 'production';
  test?: RegExp;
  exclude?: RegExp | string[];
  // (babel-loader options)
  options?: Object;
}
```

Default test extensions - js, jsx, ts, tsx.
Runs in a separate thread.

## Styles Loaders

### cssLoader({ mode, test, exclude })
Params:
```ts
{
  mode: 'development' | 'production';
  test?: RegExp;
  exclude?: RegExp | string[];
}
```

Contains: style-loader, css-loader, postcss-loader (autoprefixer).
In production minify.


### sassLoader({ mode, test, exclude })
Params:
```ts
{
  mode: 'development' | 'production';
  test?: RegExp;
  exclude?: RegExp | string[];
}
```

Contains: style-loader, css-loader, postcss-loader (autoprefixer), sass-loader.
In production minify.

## Images Loaders

### imagesLoader({ mode, test, exclude, optimizationOptions, outputDirectoryName })

Params:
```ts
{
  mode: 'development' | 'production';
  // image-webpack-loader optinos
  optimizationOptions?: Object;
  outputDirectoryName?: string;
  test?: RegExp;
  exclude?: RegExp | string[];
}
```

Contains: url-loader, image-webpack-loader.

Default test RegExp - /\.(png|jpg|jpeg|gif|webp)$/i

Converts images to base64 if file size <= 60.

In production minify images. Default optimizationOptions:
```js
{
  mozjpeg: {
    progressive: true,
    quality: 90
  },
  optipng: {
    optimizationLevel: 3
  },
  pngquant: {
    enabled: false
  }
}
```

### svgLoader({ mode, test, exclude, optimizationOptions, outputDirectoryName })

Params:
```ts
{
  mode: 'development' | 'production' | 'legacy' | 'modern';
  // image-webpack-loader optinos
  optimizationOptions?: Object;
  outputDirectoryName?: string;
  test?: RegExp;
  exclude?: RegExp | string[];
}
```

Contains: file-loader, image-webpack-loader.
In production minify svg. (default image-webpack-loader options).

### svgSpriteLoader({ mode, test, exclude, extractInProd, options, optimizationOptions })

Params:
```ts
{
  mode: 'development' | 'production' | 'legacy' | 'modern';
  // svg-sprite-loader optinos
  options?: Object;
  // image-webpack-loader optinos
  optimizationOptions?: Object;
  test?: RegExp;
  exclude?: RegExp | string[];
}
```

Contains: svg-sprite-loader, image-webpack-loader.
Adds a satisfying "test" regExp svg to sprite.
In production minify svg. (default image-webpack-loader options).

Don't forget to add excludeSvg param in **commomConfigParams**, SpriteLoaderPlugin in prodOptions and inject to html template code as [in the example](#spriteExample).

## Fonts Loaders

### fontsLoader({ mode, test, exclude, outputDirectoryName })

Params:
```ts
{
  mode: 'development' | 'production' | 'legacy' | 'modern';
  outputDirectoryName?: string;
  test?: RegExp;
  exclude?: RegExp | string[];
}
```

Contains: files-loader.

# Mode utils
There are ready-made utils for working with modes.

```js
const { isProduction, isDevelopment, isLegacyMode, isModernMode } = require('webpack-spa-config');
```

* **isProduction(mode)**
* **isDevelopment(mode)**
* **isLegacyMode(compatibilityMode)**
* **isModernMode(compatibilityMode)**

# Example of expansion/change of configuration
```
webpack.config.js
```
```js
const { resolve } = require('path');
const { createConfig, sassLoader } = require('webpack-spa-config');

const scriptsPath = resolve(__dirname, 'src', 'scripts');
const publicFilesPath = resolve(__dirname, 'public');
const outputPath = resolve(__dirname, 'build');
const imagesPath = resolve(publicFilesPath, 'images');

const basicParams = {
  entryPath: resolve(scriptsPath, 'index.jsx'),
  outputPath,
  templatePath: resolve(publicFilesPath, 'index.html')
};

const addToAllConfigs = ({ mode }) => ({
  module: {
    rules: [
      sassLoader({ mode }),
      // replace default cssLoader ()
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      src: resolve(scriptsPath),
      images: imagesPath,
      sprite: resolve(imagesPath, 'sprite')
    }
  }
});

const addToDevConfig = () => ({
  // merge with default dev config
  devServer: {
    open: false
  },
  // output
  //   devServer: {
  //     contentBase: outputPath,
  //     host: '0.0.0.0',
  //     open: false,
  //     hot: true,
  //     useLocalIp: true,
  //     historyApiFallback: true
  //   },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.IS_PRODUCTION': JSON.stringify(false)
    })
  ]
});

const addToProdConfig = () => ({
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.IS_PRODUCTION': JSON.stringify(true)
    })
  ]
});

module.exports = createConfig({
    basicParams,
    addToAllConfigs,
    addToDevConfig,
    addToProdConfig
  });
```

# <a name="spriteExample">Example with svg sprite</a>

In this example, svg-sprite in prod mode is loaded from the browser as a separate file.

```
webpack.config.js
```
```js
const { resolve } = require('path');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const { createConfig, svgSpriteLoader } = require('webpack-spa-config');

const scriptsPath = resolve(__dirname, 'src', 'scripts');
const publicFilesPath = resolve(__dirname, 'public');
const outputPath = resolve(__dirname, 'build');

const svgSpriteRegExp = /sprite\/*\/.*\.svg$/i;

const basicParams = {
  entryPath: resolve(scriptsPath, 'index.jsx'),
  outputPath,
  templatePath: resolve(publicFilesPath, 'index.html'),
  svgSpriteRegExp
};

const addToAllConfigs = ({ mode }) => ({
  module: {
    rules: [
      // in prod mode extract: true
      svgSpriteLoader({ mode, test: svgSpriteRegExp })
    ]
  }
});

const addToProdConfig = () => ({
  plugins: [new SpriteLoaderPlugin()]
});

module.exports = createConfig({
    basicParams,
    addToAllConfigs,
    addToProdConfig
  });

```

Use url param for load svg-sprite file.

```js
import twitterIcon from '../public/images/sprite/twitter.svg';
// => {id string, width: string, height: string, viewBox: string, url: string}

const TwitterIcon = ({ url, viewBox, width, height }) => (
  <svg
    fill="currentColor"
    viewBox={twitterIcon.viewBox}
    width={twitterIcon.width}
    height={twitterIcon.height}
  >
    <use xlinkHref={twitterIcon.url} />
  </svg>
);
```

Other examples: https://github.com/JetBrains/svg-sprite-loader/tree/master/examples.

# <a name="compatibilityExample">Compatibility example</a>

```
package.json
```
```json
...
"scripts": {
  "build:compatibility:dev": "COMPATIBILITY=true webpack --mode=development --config webpack.config.js",
  "build:compatibility:prod": "COMPATIBILITY=true webpack --mode=production --config webpack.config.js",
}
...
```

```
webpack.config.js
```

```js
const { resolve } = require('path');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { createConfig, isModernMode } = require('webpack-spa-config');

const scriptsPath = resolve(__dirname, 'src', 'scripts');
const publicFilesPath = resolve(__dirname, 'public');
const outputPath = resolve(__dirname, 'build');

const basicParams = {
  entryPath: resolve(scriptsPath, 'index.jsx'),
  outputPath,
  templatePath: resolve(publicFilesPath, 'index.html')
};

const addToAllConfigs = ({ compatibilityMode }) => {
  const configPart = {
    devtool: 'source-map'
  };

  if (isModernMode(compatibilityMode)) {
    configPart.plugins = [
      new FaviconsWebpackPlugin({
        logo: 'favicon.png',
        prefix: `favicons${sep}`,
        emitStats: false,
        inject: true
      })
    ]
  }

  return configPart;
};

module.exports = createConfig({
    basicParams,
    addToAllConfigs
  });
```

```
babel.config.js
```

```js
module.exports = {
  env: {
    // This is the config we'll use to generate bundles for legacy browsers.
    legacy: {
      presets: [
        [
          "@babel/preset-env", {
            useBuiltIns: "usage"
          }
        ],
        "@babel/preset-react"
      ],
      plugins: [
        "@babel/plugin-transform-runtime",
        "@babel/plugin-syntax-dynamic-import"
      ]
    },
    // This is the config we'll use to generate bundles for modern browsers.
    modern: {
      presets: [
        [
          "@babel/preset-env", {
            targets: {
              // This will target browsers which support ES modules.
              esmodules: true
            }
          }
        ],
        "@babel/preset-react"
      ],
      plugins: [
        "@babel/plugin-transform-runtime",
        "@babel/plugin-syntax-dynamic-import"
      ]
    }
  },
  // default config (development or production mode)
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          // This will target browsers which support ES modules.
          esmodules: true
        }
      }
    ],
    '@babel/preset-react'
  ]
};
```

```
.browserslistrc
```

```
chrome >= 55
firefox >= 52
opera >= 42
edge >= 18
ie >= 9
```
