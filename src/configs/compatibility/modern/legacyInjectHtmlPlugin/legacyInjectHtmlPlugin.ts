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
          closeTag: true,
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
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
        pluginName,
        (data, cb) => {
          // add type="module" for modern-файлов
          data.body.forEach(tag => {
            if (tag.tagName === 'script' && tag.attributes) {
              tag.attributes.type = 'module';
            }
          });

          // add Safari fix
          data.body.push({
            tagName: 'script',
            closeTag: true,
            innerHTML: safariNoModuleFix
          });

          // insert legacy-files with nomodule attribute
          this.injectLegacyScriptsToHtml(data.body);

          cb();
        }
      );
    });
  }
}

export default LegacyInjectHtmlPlugin;
