import { CreateMainConfig } from 'src/types/config';

import { createCompatibilityLegacyConfig } from './legacy';

// legacy config launches modern config
const createCompatibilityConfig: CreateMainConfig = entryParams =>
  createCompatibilityLegacyConfig(entryParams);

export { createCompatibilityConfig };
