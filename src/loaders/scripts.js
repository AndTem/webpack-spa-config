const babelLoader = options => ({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: [
    'thread-loader',
    {
      loader: 'babel-loader',
      options
    }
  ]
});

module.exports = {
  babelLoader
};
