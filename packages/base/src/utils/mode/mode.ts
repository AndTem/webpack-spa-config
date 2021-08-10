import {
  DEVELOPMENT_MODE,
  PRODUCTION_MODE,
  MODERN_MODE,
  LEGACY_MODE,
} from '../../constants/mode';

import { Mode, CompatibilityMode } from '../../types/mode';

type CheckModeFunc = (mode: Mode) => boolean;
type CheckCompatibilityModeFunc = (
  compatibilityMode: CompatibilityMode
) => boolean;

const isProduction: CheckModeFunc = (mode) => mode === PRODUCTION_MODE;
const isDevelopment: CheckModeFunc = (mode) => mode === DEVELOPMENT_MODE;

const isLegacyMode: CheckCompatibilityModeFunc = (compatibilityMode) =>
  compatibilityMode === LEGACY_MODE;
const isModernMode: CheckCompatibilityModeFunc = (compatibilityMode) =>
  compatibilityMode === MODERN_MODE;

export { isProduction, isDevelopment, isLegacyMode, isModernMode };
