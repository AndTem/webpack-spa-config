import { DEVELOPMENT_MODE, PRODUCTION_MODE } from './constants';

export type Mode = typeof DEVELOPMENT_MODE | typeof PRODUCTION_MODE;
