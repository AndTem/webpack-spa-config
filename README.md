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
  "start": "webpack-dev-server --open --mode=development",
  "build-prod": "webpack --mode=production --config webpack.config.js"
}
...
```
Don't forget to fill in the browserlist.

# Default features
* dev-server, hot replace;
* babel-loader (js, jsx);
* css-loader, postcss (autoprefixer), minimizes css. Default output directory - 'styles';
* image-loader - limit: 60. Default output directory - 'images';
* svg-loader - default output directory - 'images';
* minimizes html template;
* split chunks + runtime chunks;
* define process.env.NODE_ENV;
* removal of the previous assembly before starting a new one in production;
* default imagemin minimezes except jpeg (converted to progressive jpeg);
* static bundle report (webpack-bundle-analyzer).

# API
```
const createConfig = require('webpack-spa-config');

createConfig(mode, commonParams, { commonOptions, devOptions, prodOptions })
```
* **mode** - required (string);
* **commonParams** - required parameters for the entire assembly (object):
	 * **entryPath** (string);
   * **outputPath** (string);
   * **publicFilesPath** (string) - path to the directory where the public files are stored (images, fonts ...);
   * **templatePath** (string) - path to the prepared template.
* **commonOptions** - options merged with common config (function);
* **devOptions** - options merged with development config (function);
* **prodOptions** - options merged with production config (function);

There are also ready loaders.

## Loaders
```
const loaders = require('webpack-spa-config/loaders');
```

All loaders are functions.

* **babelLoader()** - js, jsx;
* **cssLoader()** - contains: style-loader, css-loader, postcss-loader (autoprefixer). In production minify;
* **sassLoader()** - contains: style-loader, css-loader, postcss-loader (autoprefixer)sass-loader;
* **imagesLoader(mode, outputDirectoryName)** - contains: url-loader:
  * **mode** - required (string).
  * **outputDirectoryName** (string). Default directory name - images.
* **svgLoader(mode, outputDirectoryName)** - contains: file-loader:
  * **mode** - required (string).
  * **outputDirectoryName** (string). Default directory name - images.
* **svgSpriteLoader** - contains: svg-sprite-loader;
* **fontsLoader(mode, outputDirectoryName)** - contains: url-loader:
  * **mode** - required (string).
  * **outputDirectoryName** (string). Default directory name - fonts.

# Example
```
webpack.config.js
```
```js
const webpack = require('webpack');
const createConfig = require('webpack-spa-config');
const { sassLoader, imagesLoader, fontsLoader } = require('webpack-spa-config/loaders');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonConfigParams = {
  entryPath: resolve(__dirname, 'index.js'),
  outputPath: resolve(__dirname, 'dist'),
  publicFilesPath: resolve(__dirname, 'public'),
  templatePath: resolve(__dirname, 'index.html')
};

const commonOptions = mode => ({
  module: {
    rules: [
      sassLoader(),
      fontsLoader(mode)
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: resolve('myStyles', 'style.css') })
  ]
});

// Merge to default DefinePlugin

const devOptions = () => ({
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
