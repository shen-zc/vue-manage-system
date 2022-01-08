
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 最新的 vue-loader 中，VueLoaderPlugin 插件的位置有所改变
const { VueLoaderPlugin } = require('vue-loader')

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

  mode: 'development',
  // 在开发环境下，每次更改代码，都会重新进行编译
  watch: true,

  // entry 入口
  // output 出口
  entry:{
    main: './src/main.js'
  },
  resolve: {
    extensions: ['.tx', '.js', '.vue']
  },
  output:{
    path: path.resolve(__dirname, 'dist'),
    filename: './bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader'
      },
      {
        //tell webpack to use jsx-loader for all *.jsx files
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options:{
              publicPath: 'assets/'
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options:{
              publicPath: 'assets/'
            }
          },
          // 'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test:/\.(png|jpg|jpeg|gif|ico|woff|svg|eot|ttf|woff2)$/,
        exclude: /node_modules/,
        type:'asset/resource',
        // use:'url-loader?limit=8192&name=images/[name].[ext]'
        use: [
          'url-loader?limit=8192&name=assets/img/[name].[ext]',
          'file-loader?name=assets/img/[name].[ext]'
        ]
      },
    ],
  },
 
  plugins: [
    new HtmlWebpackPlugin({
      // template: path.resolve(__dirname, './index.html'),
      template: './index.html',
      filename: './index.html',
      // favicon: './public/favicon.ico',
      title: '手搭 Vue 开发环境'
    }),
    // 添加 VueLoaderPlugin 插件
    new VueLoaderPlugin(),
    // 处理 @import xxx.css
    new MiniCssExtractPlugin({
      // 类似 webpackOptions.output里面的配置 可以忽略
      filename: 'assets/css/[name].css',
      chunkFilename: 'assets/css/[id].css',
    }),
  ],

}