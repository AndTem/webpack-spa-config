import { isProduction } from 'src/utils/mode';
import { connectConfigs } from 'src/utils/config';
import { addCompatibilityPrefixToName } from 'src/utils/url';

import { MODERN_MODE } from 'src/constants/mode';

import { CreateMainConfig } from 'src/types/config';

import { createCommonConfig } from '../../common';
import { createCompatibilityModernDevConfig } from './development';

import { transformPluginsToModern } from './utils';

import { DEFAULT_SCRIPTS_FILE_NAME } from '../../common/constants';

const createCompatibilityModernConfig: CreateMainConfig = entryParams => {
  const { basicParams, mode } = entryParams;
  const createModeConfig = createCompatibilityModernDevConfig;

  const modeConfig = createModeConfig({
    ...entryParams,
    basicParams: {
      ...basicParams,
      scriptsFileName: addCompatibilityPrefixToName(
        MODERN_MODE,
        basicParams.scriptsFileName || DEFAULT_SCRIPTS_FILE_NAME
      )
    }
  });

  // add LegacyInjectHtmlPlugin
  return transformPluginsToModern(modeConfig, basicParams.outputPath);
};

export { createCompatibilityModernConfig };
