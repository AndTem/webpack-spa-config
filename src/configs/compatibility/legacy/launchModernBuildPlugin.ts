import webpack from 'webpack';

import { Config } from 'src/types/config';

const compilerStatusHandler = (err, stats) => {
  if (err) throw err;

  console.log(
    stats.toString({
      chunks: false,
      colors: true
    })
  );
};

class LaunchModernBuildPlugin {
  modernConfig: Config;

  constructor({ modernConfig }: { modernConfig: Config }) {
    this.modernConfig = modernConfig;
  }

  apply(compiler) {
    const pluginName = 'launch-modern-build-plugin';

    compiler.hooks.afterEmit.tapAsync(pluginName, () => {
      webpack(this.modernConfig, compilerStatusHandler);

      return true;
    });
  }
}

export default LaunchModernBuildPlugin;
