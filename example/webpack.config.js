const { resolve, sep } = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies

// eslint-disable-next-line import/no-extraneous-dependencies
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
const { svgSpriteLoader, sassLoader } = require('../loaders');
const createConfig = require('../index');

const scriptsPath = resolve(__dirname, 'src', 'scripts');
const publicFilesPath = resolve(__dirname, 'public');
const outputPath = resolve(__dirname, 'build');
const imagesPath = resolve(publicFilesPath, 'images');

const svgSpriteRegexp = new RegExp(`sprite\\${sep}*\\${sep}.*\\.svg$`, 'i');

const { COMPATIBILITY } = process.env;

console.log('path', resolve(scriptsPath, 'index.jsx'));
const commonParams = {
  entryPath: resolve(scriptsPath, 'index.jsx'),
  outputPath,
  publicFilesPath,
  templatePath: resolve(publicFilesPath, 'index.html'),
  excludeSvg: svgSpriteRegexp
};

const commonOptions = mode => ({
  module: {
    rules: [
      svgSpriteLoader({ mode, testRegexp: svgSpriteRegexp }),
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

const prodOptions = () => ({
  plugins: [new SpriteLoaderPlugin()]
});

if (COMPATIBILITY) {
  createConfig({
    commonParams,
    commonOptions,
    prodOptions
  });
}

module.exports = (_, { mode }) =>
  createConfig({
    mode,
    commonParams,
    commonOptions,
    prodOptions
  });
