import { Configuration, Compiler, RuleSetUseItem, RuleSetLoader } from 'webpack';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import { Nuxt } from './src/types/nuxt';

// tslint:disable-next-line:no-var-requires
const defaultConfigHash = require('hard-source-webpack-plugin/lib/defaultConfigHash');

// https://github.com/TypeStrong/ts-loader/issues/653#issuecomment-390889335
class IgnoreNotFoundExportPlugin {
  public apply(compiler: Compiler) {
    compiler.hooks.done.tap('warnfix-plugin', (stats) => {
      const messageRegExp = /export .* was not found in/;
      stats.compilation.warnings = stats.compilation.warnings.filter((warn) => {
        return !(warn.name === 'ModuleDependencyWarning' && messageRegExp.test(warn.message));
      });
    });
  }
}

export default (config: Configuration, ctx: Nuxt.Context) => {
  if (config.module) {
    config.module.rules.push({
      // yaml or yml
      test: /\.ya?ml$/,
      loaders: ['json-loader', 'yaml-loader'],
    });

    // NOTE: nuxtが生成するルールだとbabelを通してしまうので tsはbabelを通さない
    const tsRule = config.module.rules.find((rule) => {
      return rule.test ? rule.test.toString() === '/\\.ts$/i' : false;
    });

    if (tsRule !== undefined && tsRule.use) {
      tsRule.use = (tsRule.use as RuleSetUseItem[]).filter((loader) => {
        const loaderName = (loader as RuleSetLoader).loader;
        return loaderName !== undefined ? !/babel-loader/.test(loaderName) : false;
      });
    }
  }

  if (config.plugins) {
    config.plugins.push(new IgnoreNotFoundExportPlugin());

    config.plugins.push(new HardSourceWebpackPlugin({
      cacheDirectory: __dirname + '/node_modules/.cache/hard-source/[confighash]',
      configHash: (webpackConfig) =>  defaultConfigHash(webpackConfig) + '-' + process.env.NODE_ENV,
    }));

    config.plugins.push(new (HardSourceWebpackPlugin as any).ExcludeModulePlugin([
      { test: /extract-css-chunks-webpack-plugin[\\/]dist[\\/]hotLoader/ },
    ]));
  }
};
