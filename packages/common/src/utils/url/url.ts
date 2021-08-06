import { Mode, CompatibilityMode } from '../../types/mode';
import { isProduction } from '../mode';

const getFileNameDependingMode = (mode: Mode): string =>
  `[name]${isProduction(mode) ? '.[hash]' : ''}.[ext]`;

const getFilePathDependingMode = (
  mode: Mode,
  outputDirectoryName: string
): string => `${outputDirectoryName}/${getFileNameDependingMode(mode)}`;

const addCompatibilityPrefixToName = (
  compatibilityMode: CompatibilityMode,
  name: string
): string => `${compatibilityMode}.${name}`;

export {
  getFilePathDependingMode,
  addCompatibilityPrefixToName,
  getFileNameDependingMode,
};
