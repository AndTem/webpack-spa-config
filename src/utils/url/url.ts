import { Mode, CompatibilityMode } from 'src/types/mode';
import { isProduction } from 'src/utils/mode';

const getFilePathDependingMode = (
  mode: Mode,
  outputDirectoryName: string
): string =>
  `${outputDirectoryName}/[name]${isProduction(mode) ? '.[hash]' : ''}.[ext]`;

const addCompatibilityPrefixToName = (
  compatibilityMode: CompatibilityMode,
  name: string
): string => `${compatibilityMode}.${name}`;

export { getFilePathDependingMode, addCompatibilityPrefixToName };
