const path = require('path')

const webpack = require('webpack')
/* 配置 */
const config = require('../config')

/* 工具 */
const utils = require('./utils')

/* 合并配置 */
const { merge } = require('webpack-merge')
/* 基础配置 */
const baseWebpackConfig = require('./webpack.base.conf')
/* 赋值静态资源文件到其他目录 */
const CopyWebpackPlugin = require('copy-webpack-plugin')
/* HTML */
const HtmlWebpackPlugin = require('html-webpack-plugin')

/* 清理dist */
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

/* 压缩 */
const TerserPlugin = require('terser-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
  /* https://github.com/vuejs/vue-style-loader/issues/50 */
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap
    })
  },
  output: {
    filename: utils.getAssetPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.getAssetPath('js/[id].[chunkhash].js')
  },
  devtool: config.build.productionSourceMap
    ? config.build.devtool
    : false /* 是否生成SourceMap */,
  // https://webpack.docschina.org/configuration/stats/#stats-presets  移除了quiet
  // 除了初始启动信息外，什么都不会写入控制台。 这也意味着来自webpack的错误或警告是不可见的
  stats: {
    preset: 'errors-warnings'
  },
  /* 压缩js */
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      // 待会直接自己试一下
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial'
        },
        defaultVendors: {
          test: /\/src\//,
          name: 'rise',
          chunks: 'all',
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true // 去除console.log
          }
        }
      })
    ]
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': require('../config/prod.env'),
      // https://github.com/JeffreyWay/laravel-mix/issues/2514
      // https://github.com/vuejs/vue-next/tree/master/packages/vue#bundler-build-feature-flags
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false'
    }),

    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      // 决定了 script 标签的引用顺序。默认有四个选项，'none', 'auto', 'dependency', '{function}'
      chunksSortMode: 'auto'
    }),

    // 复制自定义的静态文件
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
          to: config.build.assetsSubDirectory,
          globOptions: {
            ignore: ['.*']
          }
        }
      ]
    }),

    new CleanWebpackPlugin()
  ]
})

module.exports = webpackConfig
