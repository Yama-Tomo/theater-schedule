import path from 'path';
import { Configuration, RuleSetUseItem, RuleSetLoader } from 'webpack';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultConfigHash = require('hard-source-webpack-plugin/lib/defaultConfigHash');

export default (config: Configuration) => {
  if (config.module) {
    config.module.rules.push({
      // yaml or yml
      test: /\.ya?ml$/,
      loaders: ['json-loader', 'yaml-loader'],
    });

    // NOTE: nuxtが生成するルールだとbabelを通してしまうので tsはbabelを通さない
    const tsRule = config.module.rules.find(rule => {
      return rule.test ? rule.test.toString() === '/\\.ts$/i' : false;
    });

    if (tsRule !== undefined && tsRule.use) {
      tsRule.use = (tsRule.use as RuleSetUseItem[]).filter(loader => {
        const loaderName = (loader as RuleSetLoader).loader;
        return loaderName !== undefined
          ? !/babel-loader/.test(loaderName)
          : false;
      });
    }
  }

  if (config.plugins) {
    config.plugins.push(
      new HardSourceWebpackPlugin({
        cacheDirectory: path.join(
          __dirname,
          '/node_modules/.cache/hard-source/[confighash]'
        ),
        configHash: webpackConfig =>
          defaultConfigHash(webpackConfig) + '-' + process.env.NODE_ENV,
      })
    );

    config.plugins.push(
      new HardSourceWebpackPlugin.ExcludeModulePlugin([
        { test: /extract-css-chunks-webpack-plugin[\\/]dist[\\/]hotLoader/ },
      ])
    );
  }
};
