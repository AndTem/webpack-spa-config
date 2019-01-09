# Webpack SPA Config
Webpack 4 config for SPA.

# Installation
```
npm install --save-dev webpack-spa-config webpack webpack-dev-server
```

# Getting Started
```
webpack.config.js
```
```js
const createConfig = require('webpack-spa-config');
const { sassLoader, imagesLoader, fontsLoader } = require('webpack-spa-config/loaders');

const commonConfigParams = {
  entryPath: resolve(__dirname, 'index.js'),
  outputPath: resolve(__dirname, 'dist'),
  assetsPath: resolve(__dirname, 'public'),
  templatePath: resolve(__dirname, 'index.html')
};

const commonOptions = mode => ({
  module: {
    rules: [
      sassLoader(mode),
      imagesLoader(),
      fontsLoader()
    ]
  }
});

module.exports = (_, { mode }) => createConfig(mode, commonConfigParams, { commonOptions });
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