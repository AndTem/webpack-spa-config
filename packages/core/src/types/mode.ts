import {
  DEVELOPMENT_MODE,
  PRODUCTION_MODE,
  MODERN_MODE,
  LEGACY_MODE,
} from '../constants/mode';

export type Mode = typeof DEVELOPMENT_MODE | typeof PRODUCTION_MODE;

export type CompatibilityMode = typeof MODERN_MODE | typeof LEGACY_MODE;
