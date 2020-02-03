import { isProduction } from 'src/utils/mode';
import { connectConfigs } from 'src/utils/config';
import { addCompatibilityPrefixToName } from 'src/utils/url';

import { babelLoader } from 'src/loaders';

import { LEGACY_MODE } from 'src/constants/mode';

import { CreateMainConfig } from 'src/types/config';

import { createDevConfig } from '../../development';
import { createCompatibilityModernConfig } from '../modern';
import { createLegacyProdConfig } from './legacy.prod.config';

import { addLegacyPlugins } from './utils';

import { DEFAULT_SCRIPTS_FILE_NAME } from '../../common/constants';

const createCompatibilityLegacyConfig: CreateMainConfig = entryParams => {
  const { basicParams, mode } = entryParams;
  const createModeConfig: CreateMainConfig = isProduction(mode)
    ? createLegacyProdConfig
    : createDevConfig;

  // dev or prod config
  const modeConfig = createModeConfig({
    ...entryParams,
    basicParams: {
      ...basicParams,
      scriptsFileName: addCompatibilityPrefixToName(
        LEGACY_MODE,
        basicParams.scriptsFileName || DEFAULT_SCRIPTS_FILE_NAME
      )
    }
  });

  // add launch modern build after legacy scripts build and add manifestPlugin
  return addLegacyPlugins(
    // add legacy babelLoader
    modeConfig,
    createCompatibilityModernConfig(entryParams)
  );
};

export { createCompatibilityLegacyConfig };
