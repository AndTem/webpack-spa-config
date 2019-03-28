# Webpack SPA Config
Webpack 4 config for SPA.

This configuration has everything you need to build a SPA.
Also this configuration is easy to expand.

# Installation
```
npm install --save-dev webpack-spa-config
```

# Minimum config
```
webpack.config.js
```
```js
const createConfig = require('webpack-spa-config');

const commomConfigParams = {
  entryPath: resolve(__dirname, 'index.js'),
  outputPath: resolve(__dirname, 'dist'),
  publicFilesPath: resolve(__dirname, 'public'),
  templatePath: resolve(__dirname, 'index.html')
};

module.exports = (_, { mode }) => createConfig(mode, commomConfigParams);
```

```
package.json
```
```json
...
"scripts": {
  "build": "webpack --mode=development --config webpack.config.js",
  "start": "webpack-dev-server --mode=development",
  "build-prod": "webpack --mode=production --config webpack.config.js"
}
...
```
Don't forget to fill in the browserlist and babel file.

# Default features

## Development mode
  * dev-server, hot replace (host on local ip);
  * babel-loader (js, jsx);
  * css-loader
  * image-loader - limit: 60. Default output directory - 'images';
  * svg-loader - default output directory - 'images';
  * svg-sprite - in development mode injects in runtime;
  * fonts-loader - formats: .otf, .eot, .ttf, .woff, .woff2. Default output directory - 'fonts';
  * define process.env.NODE_ENV;
  * adds .env variables in process.env.

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
  * adds .env variables in process.env;
  * removal of the previous assembly before starting a new one in production;
  * static bundle report (webpack-bundle-analyzer).

# API
```
const createConfig = require('webpack-spa-config');

createConfig(mode, commonParams, { commonOptions, devOptions, prodOptions })
```
* **mode** - required (string);
* **commonParams** - required parameters for the entire assembly (object):
	 * **entryPath** - required (string);
   * **outputPath** - required (string);
   * **publicFilesPath** (string) - required path to the directory where the public files are stored (images, fonts ...);
   * **templatePath** (string) - required path to the prepared template;
   * **publicPath** (string) - default  '/';
   * **imagesOutputDirectoryName** (string) - default 'images';
   * **fontsOutputDirectoryName** (string) - default 'fonts';
   * **excludeImages** (regexp);
   * **excludeSvg** (regexp || array[regexp]).
* **commonOptions(mode, compatibilityMode)** - options merged with common config (function):
* **devOptions(mode, compatibilityMode)** - options merged with development config (function);
* **prodOptions(mode, compatibilityMode)** - options merged with production config (function);

There are also ready loaders.

## Loaders
```
const loaders = require('webpack-spa-config/loaders');
```

All loaders are functions.

* **babelLoader()** - js, jsx;
* **cssLoader(mode)** - contains: style-loader, css-loader, postcss-loader (autoprefixer). In production minify:
  * **mode** - required (string).
* **sassLoader(mode)** - contains: style-loader, css-loader, postcss-loader (autoprefixer)sass-loader:
  * **mode** - required (string).
* **imagesLoader({ mode, outputDirectoryName, exclude })** - contains: url-loader:
  * **mode** - required (string);
  * **outputDirectoryName** (string). Default directory name - images;
  * **exclude** (regexp).
* **svgLoader({ mode, outputDirectoryName, exclude })** - contains: file-loader:
  * **mode** - required (string);
  * **outputDirectoryName** (string). Default directory name - images;
  * **exclude** (regexp).
* **svgSpriteLoader({ mode, testRegexp })** - contains: svg-sprite-loader. Don't forget to add excludeSvg param in **commomConfigParams**, SpriteLoaderPlugin in prodOptions and inject to html template code as [in the example](#spriteExample);
  * **mode** - required (string);
  * **testRegexp** - required (string);
* **fontsLoader(mode, outputDirectoryName)** - contains: url-loader:
  * **mode** - required (string);
  * **outputDirectoryName** (string). Default directory name - fonts.

# Example
```
webpack.config.js
```
```js
const webpack = require('webpack');
const createConfig = require('webpack-spa-config');
const { sassLoader } = require('webpack-spa-config/loaders');
const { isProduction } = require('webpack-spa-config/utils');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonConfigParams = {
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

      sassLoader(mode),
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
  return createConfig(mode, commonConfigParams, { commonOptions, devOptions, prodOptions });
};
```

<a name="spriteExample"># Example with svg sprite</a>

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
const createConfig = require('webpack-spa-config');
const { svgSpriteLoader } = require('webpack-spa-config/loaders');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const svgSpriteRegexp = /sprite\/*\/.*\.svg$/i;

const commonConfigParams = {
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
  createConfig(mode, commonConfigParams, { commonOptions, prodOptions });
```
