import { CreateMainConfig } from 'src/types/config';

import { createDevConfig } from '../../../development';

const createCompatibilityModernDevConfig: CreateMainConfig = entryParams =>
  createDevConfig(entryParams);

export { createCompatibilityModernDevConfig };
