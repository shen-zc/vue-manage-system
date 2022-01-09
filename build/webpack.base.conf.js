const path = require('path')

const config = require('../config')

const utils = require('./utils')

const { VueLoaderPlugin } = require('vue-loader')

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/* 解析 */
const resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

// 现在的mode基本都是在package执行语句里面设置--mode development
module.exports = {
  context: path.resolve(__dirname, '../'),
  output: {
    path: config.build.assetsRoot /* 编译到什么文件 */,
    publicPath:
      process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath,
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  /* 设置模块如何被解析 */
  resolve: {
    /* 自动解析确定的扩展,频率高的文件尽量写在前面 */
    extensions: ['.js', '.vue', '.json', '.tx'],
    /* 别名 */
    alias: {
      '@': resolve('src'),
      vue$: 'vue/dist/vue.esm-bundler.js'
    }
  },
  plugins: [
    // 添加 VueLoaderPlugin 插件
    new VueLoaderPlugin(),
    // 处理 @import xxx.css
    new MiniCssExtractPlugin({
      // 类似 webpackOptions.output里面的配置 可以忽略
      filename: 'src/assets/css/[name].css',
      chunkFilename: 'src/assets/css/[id].css',
    }),
  ],

  target: 'web', // webpack5.x 加上之后热更新才有效果
  module: {
    rules: [
      // eslint 配置是否需要开启检验
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.(js|jsx)$/,
        use: ['cache-loader', 'babel-loader'],
        exclude: /node_modules/,
        include: [resolve('src'), resolve('test')]
      },
      // {
      //   test: /\.vue$/,
      //   use: [
      //     'vue-loader',
      //   ]
      // },
      // https://stackoverflow.com/questions/64868632/vuejs-3-problem-with-vue-template-compiler
      {
        test: /\.vue$/,
        use: [
          'cache-loader',
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false // 不想让元素和元素之间有空格
              },
              babelParserPlugins: [
                'jsx',
                'classProperties',
                'decorators-legacy'
              ]
            }
          }
        ]
      },
      // https://webpack.docschina.org/guides/asset-modules/  资源模块
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 * 1024 // 4M----小于4M表现形式为baser64 大于4M就是 模块文件会被生成到输出的目标目录
          }
        },
        generator: {
          filename: utils.getAssetPath('img/[name].[hash:5][ext]') // [ext]代表文件后缀
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 2 * 1024 * 1024 // 4M
          }
        },
        generator: {
          filename: utils.getAssetPath('media/[name].[hash:5][ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 2 * 1024 * 1024 // 4M
          }
        },
        generator: {
          filename: utils.getAssetPath('fonts/[name].[hash:5][ext]')
        }
      }
    ]
  }
}
