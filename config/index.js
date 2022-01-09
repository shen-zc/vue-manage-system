// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

console.log(path.resolve(__dirname, '../src/main.js'))

module.exports = {
  /* 编译生产模式 */
  build: {
    entry: path.resolve(__dirname, '../src/main.js'),
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/' /* 资源公共文件 */,

    /**
     * Source Maps
     */

    productionSourceMap: false, // 是否生成sourcemap
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },

  /* 编译开发模式 */
  dev: {
    // path
    entry: path.resolve(__dirname, '../src/main.js'),

    assetsSubDirectory: 'static',   /* 静态文件资源 */
    assetsPublicPath: '/',

    /* 跨域 */
    proxyTable: {},

    // 服务器设置
    host: 'localhost', // 可以被process.env.HOST覆盖 【优先级比环境配置低】
    port: 6001, // 可以被process.env.PORT覆盖【优先级比环境配置低】，如果端口正在使用中，则将确定一个空闲端口
    autoOpenBrowser: false,  /* 是否自动打开浏览器 */
    errorOverlay: true, /* 代码错误是否覆盖全屏浏览器上 */
    notifyOnErrors: true, /* 开启错误提示 */
    poll: false, // 监视文件 https://webpack.docschina.org/configuration/watch/

    showEslintErrorsInOverlay: true, // eslint错误是否显示在console终端上
    useEslint: false /* 是否使用eslint */,

    /**
     * Source Maps
     */

    productionSourceMap: true, // 是否生成sourcemap

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-cheap-module-source-map',  /* 开发者控制台的信息如何展示 */

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  /* 编译开发模式 2 */
  dev2: {
    entry: path.resolve(__dirname, '../src/main.js'),

    // path
    assetsSubDirectory: 'static',   /* 静态文件资源 */
    assetsPublicPath: '/',

    /* 跨域 */
    proxyTable: {},

    // 服务器设置
    host: 'localhost', // 可以被process.env.HOST覆盖 【优先级比环境配置低】
    port: 6001, // 可以被process.env.PORT覆盖【优先级比环境配置低】，如果端口正在使用中，则将确定一个空闲端口
    autoOpenBrowser: false,  /* 是否自动打开浏览器 */
    errorOverlay: true, /* 代码错误是否覆盖全屏浏览器上 */
    notifyOnErrors: true, /* 开启错误提示 */
    poll: false, // 监视文件 https://webpack.docschina.org/configuration/watch/

    showEslintErrorsInOverlay: true, // eslint错误是否显示在console终端上
    useEslint: true /* 是否使用eslint */,

    /**
     * Source Maps
     */

    productionSourceMap: true, // 是否生成sourcemap

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-cheap-module-source-map',  /* 开发者控制台的信息如何展示 */

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  }
}
