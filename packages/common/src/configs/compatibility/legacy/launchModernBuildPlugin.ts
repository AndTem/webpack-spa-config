import webpack, { Plugin, Compiler } from 'webpack';

import { Config } from '../../../types/config';

const compilerStatusHandler = (err, stats) => {
  if (err) throw err;

  console.log(
    stats.toString({
      chunks: false,
      colors: true,
    })
  );
};

class LaunchModernBuildPlugin implements Plugin {
  modernConfig: Config;

  constructor({ modernConfig }: { modernConfig: Config }) {
    this.modernConfig = modernConfig;
  }

  apply(compiler: Compiler) {
    const pluginName = 'launch-modern-build-plugin';

    compiler.hooks.done.tapAsync(pluginName, (stats) => {
      // if an error occurs while building legacy then webpack will simply ignore it
      // therefore we handle errors manually
      if (stats.hasErrors()) {
        console.log(
          stats.toString({
            chunks: false,
            colors: true,
          })
        );

        process.exit(1);
      }

      webpack(this.modernConfig, compilerStatusHandler);
    });
  }
}

export default LaunchModernBuildPlugin;
