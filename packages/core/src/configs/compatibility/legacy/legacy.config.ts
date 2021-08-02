import { isProduction } from '../../../utils/mode';
import { addCompatibilityPrefixToName } from '../../../utils/url';

import { LEGACY_MODE } from '../../../constants/mode';

import { CreateMainConfig } from '../../../types/config';

import { createDevConfig } from '../../development';
import { createCompatibilityModernConfig } from '../modern';
import { createLegacyProdConfig } from './legacy.prod.config';

import { addLegacyPlugins } from './utils';

import { DEFAULT_SCRIPTS_FILE_NAME } from '../../common/constants';

const createCompatibilityLegacyConfig: CreateMainConfig = (entryParams) => {
  const { basicParams, mode } = entryParams;
  const createModeConfig: CreateMainConfig = isProduction(mode)
    ? createLegacyProdConfig
    : createDevConfig;

  // dev or prod config
  const modeConfig = createModeConfig({
    ...entryParams,
    compatibilityMode: LEGACY_MODE,
    basicParams: {
      ...basicParams,
      scriptsFileName: addCompatibilityPrefixToName(
        LEGACY_MODE,
        basicParams.scriptsFileName || DEFAULT_SCRIPTS_FILE_NAME
      ),
    },
  });

  // add launch modern build after legacy scripts build and add manifestPlugin
  return addLegacyPlugins(
    // add legacy babelLoader
    modeConfig,
    createCompatibilityModernConfig(entryParams)
  );
};

export { createCompatibilityLegacyConfig };
