# Webpack SPA Config
Webpack 4 config for SPA.

This configuration has everything you need to build a SPA. Also this configuration is easy to extend and editing.

🔥In this configuration there is "compatibility" mode. It is a separate build for old and new browsers. Js files size for new browsers is reduced by about **11%**.

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
  * svg-sprite - in development mode injects in runtime;
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

## Loaders
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

### Scripts loaders

#### babelLoader({ mode, test, exclude, options })
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

### Styles Loaders

#### cssLoader({ mode, test, exclude })
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


#### sassLoader({ mode, test, exclude })
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

### Images Loaders

#### imagesLoader({ mode, test, exclude, optimizationOptions, outputDirectoryName })

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

#### svgLoader({ mode, test, exclude, optimizationOptions, outputDirectoryName })

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

#### svgSpriteLoader({ mode, test, exclude, optimizationOptions })

Params:
```ts
{
  mode: 'development' | 'production' | 'legacy' | 'modern';
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

### Fonts Loaders

#### fontsLoader({ mode, test, exclude, outputDirectoryName })

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

## Utils
```js
const utils = require('webpack-spa-config/utils');
```

* **isProduction(mode)**
* **isDevelopment(mode)**
* **isLegacyMode(compatibilityMode)**
* **isModernMode(compatibilityMode)**
* **isCompatibilityMode(compatibilityMode)**

# Example of expansion/change of configuration
```
webpack.config.js
```
```js
const webpack = require('webpack');
const createConfig = require('webpack-spa-config');
const { sassLoader } = require('webpack-spa-config/loaders');
const { isProduction } = require('webpack-spa-config/utils');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonParams = {
  entryPath: resolve(__dirname, 'index.js'),
  outputPath: resolve(__dirname, 'dist'),
  publicFilesPath: resolve(__dirname, 'public'),
  templatePath: resolve(__dirname, 'index.html'),
};

const commonOptions = (mode, compatibilityMode) => ({
  module: {
    rules: [
      // Replace imageLoader limit
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 300
            }
          }
        ]
      },
      // Output
      // ...
      // {
      //  test: /\.(png|jpg|jpeg|gif|webp)$/i,
      //  use: [
      //    {
      //      loader: 'url-loader',
      //      options: {
      //        limit: 300,
      //        name: urlLoaderFileName(mode, outputDirectoryName)
      //      }
      //    }
      //  ]
      // }
      // ...

      sassLoader({ mode }),
    ],
    resolve: {
      alias: {
        common: resolve(__dirname, 'common')
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: resolve('myStyles', 'style.css') })
  ]
});

// Merge to default DefinePlugin

const devOptions = () => ({
  devServer: {
    open: false
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false)
    }),
  ]
});

// Output
// {
//   ...
//   plugins: [
//     ...
//     new webpack.DefinePlugin({
//       'process.env.NODE_ENV': JSON.stringify(DEVELOPMENT_MODE),
//       PRODUCTION: JSON.stringify(false)
//     }),
//     new MiniCssExtractPlugin({ filename: resolve('myStyles', 'style.css') })
//     ...
//   ]
//   ...
// }

const prodOptions = () => ({
  devtool: 'cheap-source-map',
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true)
    }),
  ]
});

module.exports = (_, { mode }) => {
  return createConfig({ mode, commonParams, commonOptions, devOptions, prodOptions });
};
```

# <a name="spriteExample">Example with svg sprite</a>

```
index.html
```
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1 shrink-to-fit=no">

    <title>Webpack SPA</title>

    <style>
      .sprite-symbol-usage {
        display: inline !important;
      }
    </style>
  </head>
  <body>
    <div style="display: none;">
      <% if (htmlWebpackPlugin.files.sprites) { %> <% for (var spriteFileName in
      htmlWebpackPlugin.files.sprites) { %> <%= htmlWebpackPlugin.files.sprites[spriteFileName] %>
      <% } %> <% } %>
    </div>
    ...
  </body>
</html>
```

```
webpack.config.js
```
```js
const { sep } = require('path');
const createConfig = require('webpack-spa-config');
const { svgSpriteLoader } = require('webpack-spa-config/loaders');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const svgSpriteRegexp = new RegExp(`sprite\\${sep}*\\${sep}.*\\.svg$`, 'i');

const commonParams = {
  entryPath: resolve(__dirname, 'index.js'),
  outputPath: resolve(__dirname, 'dist'),
  publicFilesPath: resolve(__dirname, 'public'),
  templatePath: resolve(__dirname, 'index.html'),
  // Exclude svg-sprite to cancel minimization
  excludeSvg: [svgSpriteRegexp]
};

const commonOptions = mode => ({
  module: {
    rules: [
      svgSpriteLoader({ mode, testRegexp: svgSpriteRegexp })
    ]
  }
});

const prodOptions = () => ({
  plugins: [
    new SpriteLoaderPlugin()
  ]
});

module.exports = (_, { mode }) =>
  createConfig({ mode, commonParams, commonOptions, prodOptions });
```

# <a name="compatibilityExample">Compatibility example</a>

```
package.json
```
```json
...
"scripts": {
  "build": "COMPATIBILITY=true node webpack.config.js"
}
...
```

```
webpack.config.js
```

```js
const createConfig = require('webpack-spa-config');

const { COMPATIBILITY } = process.env;

const commomParams = {
  entryPath: resolve(__dirname, 'index.js'),
  outputPath: resolve(__dirname, 'dist'),
  publicFilesPath: resolve(__dirname, 'public'),
  templatePath: resolve(__dirname, 'index.html')
};

if (COMPATIBILITY) createConfig({ commomParams });

// for development or production mode
module.exports = (_, { mode }) => createConfig({ mode, commomParams });
```

**Don't forget add @babel/preset-env to dependencies for babel prop - useBuiltIns: "usage". If throw error - delete node_modules and package-lock.json**

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
last 4 version
ie >= 9
```
