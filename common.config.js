const {
  babelLoader,
  cssLoader
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
      cssLoader(mode)
    ]
  }
});
