import HtmlWebpackPlugin from 'html-webpack-plugin';

import { safariNoModuleFix } from './safariNomoduleFix';

const JS_REGEXP = /\.js$/;

class LegacyInjectHtmlPlugin {
  legacyManifestPath: string;

  constructor(options: { legacyManifestPath: string }) {
    const { legacyManifestPath } = options;

    this.legacyManifestPath = legacyManifestPath;
  }

  injectLegacyScriptsToHtml(body) {
    // get data about the past legacy assembly from the manifest.json
    // eslint-disable-next-line
    const legacyManifest: Record<string, string> = require(this
      .legacyManifestPath);

    Object.values(legacyManifest).forEach(filePath => {
      if (JS_REGEXP.test(filePath)) {
        body.push({
          tagName: 'script',
          voidTag: false,
          attributes: {
            src: filePath,
            nomodule: true
          }
        });
      }
    });
  }

  apply(compiler) {
    const pluginName = 'legacy-inject-html-plugin';

    compiler.hooks.compilation.tap(pluginName, compilation => {
      // subscribe on html-webpack-plugin for change html
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
        pluginName,
        (data, cb) => {
          // add type="module" for modern-файлов
          data.bodyTags.forEach(tag => {
            if (tag.tagName === 'script' && tag.attributes) {
              tag.attributes.type = 'module';
            }
          });

          // add Safari fix
          data.bodyTags.push({
            tagName: 'script',
            attributes: {},
            innerHTML: safariNoModuleFix,
            voidTag: false
          });

          // insert legacy-files with nomodule attribute
          this.injectLegacyScriptsToHtml(data.bodyTags);

          cb();
        }
      );
    });
  }
}

export default LegacyInjectHtmlPlugin;
