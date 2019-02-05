const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const defaultConfigHash       = require('hard-source-webpack-plugin/lib/defaultConfigHash');

// https://github.com/TypeStrong/ts-loader/issues/653#issuecomment-390889335
class IgnoreNotFoundExportPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('warnfix-plugin', (stats) => {
      const messageRegExp = /export '.* was not found in/
      stats.compilation.warnings = stats.compilation.warnings.filter((warn) => {
        if (warn.name === 'ModuleDependencyWarning' && messageRegExp.test(warn.message)) {
          return false
        }
        return true
      });
    })
  }
}

module.exports = function(config, ctx) {
  config.module.rules.push({
    // yaml or yml
    test: /\.ya?ml$/,
    loaders: ['json-loader', 'yaml-loader']
  });

  // NOTE: nuxtが生成するルールだとbabelを通してしまうので tsはbabelを通さない
  const tsRule = config.module.rules.find(rule => rule.test.toString() === '/\\.ts$/i');
  if (tsRule !== undefined) {
    tsRule.use = tsRule.use.filter(loader => !/babel-loader/.test(loader.loader));
  }

  config.plugins.push(new IgnoreNotFoundExportPlugin());

  config.plugins.push(new HardSourceWebpackPlugin({
    cacheDirectory: __dirname + '/node_modules/.cache/hard-source/[confighash]',
    configHash: function(webpackConfig) {
      return defaultConfigHash(webpackConfig) + '-' + process.env.NODE_ENV;
    }
  }));

  config.plugins.push(new HardSourceWebpackPlugin.ExcludeModulePlugin([
    { test: /extract-css-chunks-webpack-plugin[\\/]dist[\\/]hotLoader/ }
  ]));
};
