import {
  ModifyConfigFunc,
  compose,
  createConfigDecorator,
  Mode,
} from '@webpackon/core';
import { withBabel } from '@webpackon/babel';
import { withTs } from '@webpackon/typescript';
import { withOptimization } from '@webpackon/optimization';
import { AdditionalEntryParams } from '../entry';

const getScriptsLoader = (
  { useTs }: AdditionalEntryParams,
  mode: Mode
): ReturnType<typeof createConfigDecorator> => {
  if (useTs) {
    return withTs();
  }

  return withBabel();
};

export const modify: ModifyConfigFunc<AdditionalEntryParams> = (
  config,
  context
) => {
  const { mode, production = {} } = context;
  const { splitChunkCacheGroups } = production;

  const modifyConfig = compose(
    withOptimization({
      mode,
      splitChunkCacheGroups: [
        ...splitChunkCacheGroups,
        { chunkName: 'react', includePackages: ['react', 'react-dom'] },
      ],
    })
  );

  return modifyConfig(config);
};
