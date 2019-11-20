const safariNoModuleFix = require('./safariNoModuleFix');

const { JS_REGEXP } = require('../constants');

class LegacyInjectHtmlPlugin {
  constructor(options) {
    const { manifestPath } = options;

    this.manifestPath = manifestPath;
  }

  injectLegacyScriptsToHtml(body) {
    // Получаем информацию о legacy Build
    const legacyManifest = require(this.manifestPath);

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
      // Подписываемся на хук html-webpack-plugin,
      // в котором можно менять данные HTML
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
        pluginName,
        (data, cb) => {
          // Добавляем type="module" для modern-файлов
          data.body.forEach(tag => {
            if (tag.tagName === 'script' && tag.attributes) {
              tag.attributes.type = 'module';
            }
          });

          // Вставляем фикс для Safari
          data.body.push({
            tagName: 'script',
            closeTag: true,
            innerHTML: safariNoModuleFix
          });

          // Вставляем legacy-файлы с атрибутом nomodule
          this.injectLegacyScriptsToHtml(data.body);

          cb();
        }
      );
    });
  }
}

module.exports = LegacyInjectHtmlPlugin;
