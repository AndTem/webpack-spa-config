const webpack = require('webpack');

const commonCompatibilityConfig = require('./common.config');

const { mergeConfigOptions } = require('../../utils/merge');
const { compilerStatusHandler } = require('./utils');

const { PRODUCTION_MODE, LEGACY_MODE, MODERN_MODE } = require('../../constants');

module.exports = (commonConfigParams, commonOptions, prodOptions) => {
  const modernCompiler = () => {
    webpack(
      commonCompatibilityConfig(
        MODERN_MODE,
        commonConfigParams,
        mergeConfigOptions(
          commonOptions(PRODUCTION_MODE, MODERN_MODE),
          prodOptions(PRODUCTION_MODE, MODERN_MODE)
        )
      ),
      compilerStatusHandler()
    );
  };

  webpack(
    commonCompatibilityConfig(
      LEGACY_MODE,
      commonConfigParams,
      mergeConfigOptions(
        commonOptions(PRODUCTION_MODE, LEGACY_MODE),
        prodOptions(PRODUCTION_MODE, LEGACY_MODE)
      )
    ),
    compilerStatusHandler(modernCompiler)
  );
};
