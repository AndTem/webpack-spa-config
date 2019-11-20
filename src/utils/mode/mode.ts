import {
  DEVELOPMENT_MODE,
  PRODUCTION_MODE,
  MODERN_MODE,
  LEGACY_MODE
} from '../../constants';

import { Mode } from '../../types/mode';

type CheckModeFunc = (mode: Mode) => boolean;

const isProduction: CheckModeFunc = mode => mode === PRODUCTION_MODE;
const isDevelopment: CheckModeFunc = mode => mode === DEVELOPMENT_MODE;

const isLegacyMode: CheckModeFunc = mode => mode === LEGACY_MODE;
const isModernMode: CheckModeFunc = mode => mode === MODERN_MODE;
const isCompatibilityMode: CheckModeFunc = mode =>
  isLegacyMode(mode) || isModernMode(mode);

export {
  isProduction,
  isDevelopment,
  isLegacyMode,
  isModernMode,
  isCompatibilityMode
};
