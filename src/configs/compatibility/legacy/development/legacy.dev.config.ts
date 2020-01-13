import { CreateMainConfig } from 'src/types/config';

import { createDevConfig } from '../../../development';

import { createLegacyDevPlugins } from './plugins';

const createCompatibilityLegacyDevConfig: CreateMainConfig = entryParams => {
  const { mode } = entryParams;

  const legacyDevConfig = createDevConfig(entryParams);

  legacyDevConfig.plugins = createLegacyDevPlugins({ mode });

  return legacyDevConfig;
};

export { createCompatibilityLegacyDevConfig };
