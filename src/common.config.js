const {
  babelLoader,
  cssLoader,
  imagesLoader,
  svgLoader,
  fontsLoader
} = require('./loaders');

module.exports = ({
  entryPath,
  outputPath,
  publicPath,
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
      imagesLoader(mode),
      svgLoader(mode),
      fontsLoader(mode)
    ]
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css', '.scss', '.less']
  }
});
