import { CreateMainConfig } from 'src/types/config';

import { createCompatibilityLegacyConfig } from './legacy';

const createCompatibilityConfig: CreateMainConfig = entryParams =>
  createCompatibilityLegacyConfig(entryParams);

export { createCompatibilityConfig };
