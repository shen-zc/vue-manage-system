/* 项目信息 */
const pkg = require('../package.json')
/* 该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象 */
const ExtractTextPlugin = require('mini-css-extract-plugin')
const path = require('path')
// const config = require('../config')

/* 把资源文件放到目录下 */
exports.getAssetPath = function (filePath, options = {}) {
  return options.assetsDir
    ? path.posix.join(options.assetsDir, filePath)
    : filePath
}

/* 解析css */
exports.cssLoaders = function (options) {
  options = options || {}

  /* 解析.css文件 */
  const cssLoader = {
    loader: 'css-loader',
    options: {
      // https://github.com/vuejs/vue-style-loader/issues/50
      // https://github.com/vuejs/vue-style-loader#differences-from-style-loader
      // esModule: false, // 默认为true  vue-style-loader是style-loader的一层封装---要不使用style-loader，要不esModule: false
      // tips 暂且用style-loader来替代vue-style-loader
      sourceMap: options.sourceMap
    }
  }

  /* 解析前缀css */
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // 生成用于提取文本插件的加载程序字符串
  const generateLoaders = (loader, loaderOptions) => {
    /* 是否使用解析前缀 */
    const loaders = options.usePostCSS
      ? [cssLoader, postcssLoader]
      : [cssLoader]
    if (loader) {
      /* 存在loader，往里面添加loader的解析 */
      loaders.push({
        loader: loader + '-loader',
        /* options的配置基础配置与传递参数配置合并 */
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // 当指定该选项时就会提取CSS到单独文件
    // (生产构建期间的情况)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'style-loader' // 暂且用style-loader来替代vue-style-loader https://github.com/vuejs/vue-style-loader#differences-from-style-loader
      })
    } else {
      return ['style-loader'].concat(loaders) // 暂且用style-loader来替代vue-style-loader https://github.com/vuejs/vue-style-loader#differences-from-style-loader
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  /* 只对生产应用CSS提取，以便在开发期间获得CSS热重新加载 */
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus')
  }
}

// 把.vue文件内部的style加载成独立css文件的 加载器
exports.styleLoaders = function (options) {
  const output = []
  /* 预处理css类型有stylus scss sass postcss css */
  const loaders = exports.cssLoaders(options)
  /* 把所有类型进行 */
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

/* 错误信息回调 */
exports.createNotifierCallback = function () {
  /* 系统级别的消息 */
  const notifier = require('node-notifier')

  return (severity, errors) => {
    /* 类型不是error就直接return */
    if (severity !== 'error') {
      return
    }
    /* 获取第一个错误 */
    const error = errors[0]

    const filename = error.file && error.file.split('!').pop()
    notifier.notify({
      title: pkg.name /* 项目名称 */,
      message: severity + ': ' + error.name /* 级别+错误信息 */,
      subtitle: filename || '' /* 错误文件 */,
      icon: path.join(__dirname, 'logo.png') /* logo */
    })
  }
}
