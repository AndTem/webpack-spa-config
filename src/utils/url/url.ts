import { Mode } from 'src/types/mode';
import { isProduction } from 'src/utils/mode';

const getFileNameDependingEnv = (
  mode: Mode,
  outputDirectoryName: string
): string =>
  `${outputDirectoryName}/[name]${isProduction(mode) ? '.[hash]' : ''}.[ext]`;

export { getFileNameDependingEnv };
