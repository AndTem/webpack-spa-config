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
  publicPath,
  imagesOutputDirectoryName,
  fontsOutputDirectoryName,
  excludeImages,
  excludeSvg,
  mode
}) => ({
  target: 'web',

  entry: entryPath,

  output: {
    filename: '[hash].bundle.js',
    path: outputPath,
    publicPath: publicPath || '/'
  },

  module: {
    rules: [
      babelLoader(),
      cssLoader(mode),
      imagesLoader({ mode, imagesOutputDirectoryName, exclude: excludeImages }),
      svgLoader({ mode, imagesOutputDirectoryName, exclude: excludeSvg }),
      fontsLoader(mode, fontsOutputDirectoryName)
    ]
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css', '.scss', '.less']
  }
});
