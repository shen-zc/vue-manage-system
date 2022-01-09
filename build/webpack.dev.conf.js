const webpack = require('webpack')
const path = require('path')
/* 个人配置信息 */
const config = require('../config')

/* 工具 */
const utils = require('./utils')

/* 配置合并 */
const { merge } = require('webpack-merge')

/* 基础配置 */
const baseWebpackConfig = require('./webpack.base.conf')

/* 模板 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
/* 友好的错误提示插件 */
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

/* 端口被占用 +1 */
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

/* 开发配置 */
const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  entry: config.dev.entry,
  /* https://github.com/vuejs/vue-style-loader/issues/50 */
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap
    })
  },

  // 开发模式如何生成source map
  devtool: config.dev.productionSourceMap
    ? config.dev.devtool
    : false /* 是否生成SourceMap */,

  // these devServer options should be customized in /config/index.js
  /* 个人信息配置选项 */
  devServer: {
    /* 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html */
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(config.dev.assetsPublicPath, 'index.html')
        }
      ]
    },
    hot: true /* 启用 webpack 的模块热替换特性 */,
    compress: true /* 一切服务都启用gzip 压缩 */,
    host: HOST || config.dev.host /* 域名 */,
    port: PORT || config.dev.port /* 端口 */,
    open: config.dev.autoOpenBrowser /* 是否自动打开浏览器 */,
    // overlay: config.dev.errorOverlay
    //   ? {
    //       warnings: false /* 警告不覆盖 */,
    //       errors: true /* 错误全屏覆盖 */
    //     }
    //   : false /* 当出现编译器错误或警告时，在浏览器中显示全屏覆盖。默认情况下禁用。如果您只想显示编译器错误 */,
    proxy: config.dev.proxyTable /* 跨域配置 */
  },
  // https://webpack.docschina.org/configuration/stats/#stats-presets  移除了quiet
  // 除了初始启动信息外，什么都不会写入控制台。 这也意味着来自webpack的错误或警告是不可见的。
  stats: {
    preset: 'errors-only'
  },
  // 在第一个错误出现时抛出失败结果，而不是容忍它。-- 这将迫使 webpack 退出其打包过程
  bail: true,
  // 在运行 webpack 时，通过使用 --progress 标志，来验证文件修改后，是否没有通知 webpack。如果进度显示保存，但没有输出文件，则可能是配置问题，而不是文件监视问题
  watchOptions: {
    poll: config.dev.poll,
    ignored: /node_modules/
  },
  plugins: [
    /* 环境设置为development */
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env'),
      // https://github.com/JeffreyWay/laravel-mix/issues/2514
      // https://github.com/vuejs/vue-next/tree/master/packages/vue#bundler-build-feature-flags
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false'
    }),

    new webpack.HotModuleReplacementPlugin() /* 开启webpack热更新功能 */,
    new FriendlyErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // new webpack.SourceMapDevToolPlugin({
    //   filename: '[file].map',
    //   include: ['main.js'],
    //   exclude: ['vendor.js'],
    //   columns: false
    // })
  ],

  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    /* 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。 */
    moduleIds: 'named' /* NamedModulesPlugin模块 迁移 */,
    /* webpack编译出错跳过报错阶段,在编译结束后报错 */
    emitOnErrors: true /* NoEmitOnErrorsPlugin模块迁移 */
  }
})

// module.exports = new Promise(function(resolve, reject) {
//   /* 存在环境变量端口就是用环境变量的 或者是设置好的config */
//   portfinder.basePort = process.env.PORT || config.dev.port
//   portfinder.getPort((err, port) => {
//     if (err) {
//       reject(err)
//     } else {
//       // publish the new Port, necessary for e2e tests
//       process.env.PORT = port
//       // 替换端口
//       devWebpackConfig.devServer.port = port

//       // 添加有好的信息提示
//       devWebpackConfig.plugins.push(
//         new FriendlyErrorsPlugin({
//           compilationSuccessInfo: {
//             messages: [
//               '写这段代码的时候，只有上帝和我知道它是干嘛的    \n    现在，只有上帝知道',
//               `Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`
//             ]
//           },
//           onErrors: config.dev.notifyOnErrors
//             ? utils.createNotifierCallback()
//             : undefined,
//           clearConsole: true
//         })
//       )
//       /* 返回开发配置 */
//       resolve(devWebpackConfig)
//     }
//   })
// })

module.exports = devWebpackConfig

console.log('debug')
