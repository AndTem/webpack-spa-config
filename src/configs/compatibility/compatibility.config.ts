import { CreateMainConfig } from 'src/types/config';

import { createCompatibilityLegacyConfig } from './legacy';

const createCompatibilityConfig: CreateMainConfig = entryParams =>
  // legacy config launches modern config
  createCompatibilityLegacyConfig(entryParams);

export { createCompatibilityConfig };
