const getCompatibilityFileName = (compatibilityMode, baseFileName = '[hash].bundle.js') =>
  `${compatibilityMode}.${baseFileName}`;

const compilerStatusHandler = callback => (err, stats) => {
  if (err) throw err;

  console.log(
    stats.toString({
      chunks: false,
      colors: true
    })
  );

  if (callback) callback();
};

module.exports = {
  getCompatibilityFileName,
  compilerStatusHandler
};
