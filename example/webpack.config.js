const { resolve, sep } = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies

// eslint-disable-next-line import/no-extraneous-dependencies
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const { createConfig, svgSpriteLoader, sassLoader } = require('webpack-spa-config');
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies

const scriptsPath = resolve(__dirname, 'src', 'scripts');
const publicFilesPath = resolve(__dirname, 'public');
const outputPath = resolve(__dirname, 'build');
const imagesPath = resolve(publicFilesPath, 'images');

const svgSpriteRegExp = new RegExp(`sprite\\${sep}*\\${sep}.*\\.svg$`, 'i');

const basicParams = {
  entryPath: resolve(scriptsPath, 'index.jsx'),
  outputPath,
  templatePath: resolve(publicFilesPath, 'index.html'),
  svgSpriteRegExp
};

const addToAllConfigs = mode => ({
  module: {
    rules: [
      svgSpriteLoader({ mode, test: svgSpriteRegExp }),
      sassLoader(mode)
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

const addToProdConfig = () => ({
  plugins: [new SpriteLoaderPlugin()]
});

module.exports = (_, { mode }) =>
  createConfig({
    mode,
    basicParams,
    addToAllConfigs,
    addToProdConfig
  });
