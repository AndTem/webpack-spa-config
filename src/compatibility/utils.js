const getCompatibilityFileName = (compatibilityMode, baseFileName = '[hash].bundle.js') =>
  `${compatibilityMode}.${baseFileName}`;

const compilerStatusHandler = callback => (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  console.log(stats.toString({
    chunks: false,
    colors: true
  }));

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }

  if (callback) callback();
};

module.exports = {
  getCompatibilityFileName,
  compilerStatusHandler
};
