import { DEVELOPMENT_MODE, PRODUCTION_MODE } from '../constants';

import { Mode } from '../types';

type CheckModeFunc = (mode: Mode) => boolean;

export const isProduction: CheckModeFunc = (mode) => mode === PRODUCTION_MODE;
export const isDevelopment: CheckModeFunc = (mode) => mode === DEVELOPMENT_MODE;
