import { isProduction } from 'src/utils/mode';
import { connectConfigs } from 'src/utils/config';
import { addCompatibilityPrefixToName } from 'src/utils/url';

import { babelLoader } from 'src/loaders';

import { LEGACY_MODE } from 'src/constants/mode';

import { CreateMainConfig } from 'src/types/config';

import { createCompatibilityLegacyDevConfig } from './development';
import { createCompatibilityModernConfig } from '../modern';

import { addLegacyPlugins } from './utils';

import { DEFAULT_SCRIPTS_FILE_NAME } from '../../common/constants';

const createCompatibilityLegacyConfig: CreateMainConfig = entryParams => {
  const { basicParams, mode } = entryParams;
  const createModeConfig = createCompatibilityLegacyDevConfig;

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

  const compatibilityConfigPart = {
    module: {
      rules: [babelLoader({ mode, options: { envName: LEGACY_MODE } })]
    }
  };

  // add launch modern build after legacy scripts build and add manifestPlugin
  return addLegacyPlugins(
    // add legacy babelLoader
    connectConfigs(modeConfig, compatibilityConfigPart),
    createCompatibilityModernConfig(entryParams)
  );
};

export { createCompatibilityLegacyConfig };
