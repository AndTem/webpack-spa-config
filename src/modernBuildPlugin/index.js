const safariNoModuleFix = require('./safariNoModuleFix');

class ModernBuildPlugin {
  apply(compiler) {
    const pluginName = 'modern-build-plugin';

    // Получаем информацию о Fallback Build
    const fallbackManifest = require('path/to/dist/fallback/manifest.json');

    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      // Подписываемся на хук html-webpack-plugin,
      // в котором можно менять данные HTML
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(pluginName, (data, cb) => {
        // Добавляем type="module" для modern-файлов
        data.body.forEach((tag) => {
          if (tag.tagName === 'script' && tag.attributes) {
            tag.attributes.type = 'module';
          }
        });

        // Вставляем фикс для Safari
        data.body.push({
          tagName: 'script',
          closeTag: true,
          innerHTML: safariNoModuleFix,
        });

        // Вставляем fallback-файлы с атрибутом nomodule
        const legacyAsset = {
          tagName: 'script',
          closeTag: true,
          attributes: {
            src: fallbackManifest['app.js'],
            nomodule: true,
            defer: true,
          },
        };
        data.body.push(legacyAsset);

        cb();
      });
    });
  }
}

module.exports = ModernBuildPlugin;
