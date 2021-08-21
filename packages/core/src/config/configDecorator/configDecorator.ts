import { Config } from '../types';

function createConfigDecorator(
  creator: (config: Config) => Config
): () => (config: Config) => Config;
function createConfigDecorator<
  CreatorParams extends Record<string, any>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  RequiredParams extends true
>(
  creator: (config: Config, params: CreatorParams) => Config
): (params: CreatorParams) => (config: Config) => Config;
function createConfigDecorator<
  CreatorParams extends Record<string, any>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  RequiredParams extends false
>(
  creator: (config: Config, params?: CreatorParams) => Config
): (params?: CreatorParams) => (config: Config) => Config;
function createConfigDecorator(creator) {
  return creator;
}

export { createConfigDecorator };
