const {
  PRODUCTION_MODE,
  DEVELOPMENT_MODE,
  LEGACY_MODE,
  MODERN_MODE
} = require('../constants');

const isProduction = mode => mode === PRODUCTION_MODE;
const isDevelopment = mode => mode === DEVELOPMENT_MODE;
const isLegacyMode = mode => mode === LEGACY_MODE;
const isModernMode = mode => mode === MODERN_MODE;
const isCompatibilityMode = mode => isLegacyMode(mode) || isModernMode(mode);

module.exports = {
  isProduction,
  isDevelopment,
  isLegacyMode,
  isModernMode,
  isCompatibilityMode
};
