const {
  babelLoader,
  cssLoader,
  imagesLoader,
  svgLoader,
  fontsLoader
} = require('../loaders');

module.exports = ({
  entryPath,
  outputPath,
  publicPath = '/',
  scriptsFileName = '[hash].bundle.js',
  imagesOutputDirectoryName,
  fontsOutputDirectoryName,
  excludeImages,
  excludeSvg,
  mode,
  compatibilityMode
}) => ({
  target: 'web',

  entry: entryPath,

  output: {
    filename: scriptsFileName,
    path: outputPath,
    publicPath: publicPath
  },

  module: {
    rules: [
      babelLoader(),
      cssLoader({ mode, compatibilityMode }),
      imagesLoader({
        mode,
        compatibilityMode,
        imagesOutputDirectoryName,
        exclude: excludeImages
      }),
      svgLoader({
        mode,
        compatibilityMode,
        imagesOutputDirectoryName,
        exclude: excludeSvg
      }),
      fontsLoader(mode, fontsOutputDirectoryName)
    ]
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css', '.scss', '.less']
  }
});
