const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: "development",
  // watch: true,
  entry: "./src/js/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/"
    // 方式一： 修改资源的输出路径
    // assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/i,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      /** 
      {
        // 这种方式处理不了html中的图片文件
        test: /\.(jpg|jpeg|png|gif|svg)$/i,
        // 使用多个loader用use，使用一个可以直接用loader
        // 需下载url-loader file-loader(url-loader依赖file-loader)
        loader: "url-loader",
        options: {
          //图片大小小于8kb,就会被base64处理（将图片变成以base64编码的字符串）
          // 优点： 减少请求数量（减轻服务器压力）
          // 缺点： 图片体积会更大（文件请求速度变慢）
          // 通常会对小图片进行base64处理，这样也不会大很多
          limit: 8 * 1024,
          // 问题：url-loader默认用es6模块解析，二html-loader用commonJs解析，解析时会出问题[object Module],解决办法关闭es6解析。
          // 不过现在好像不用关闭了
          esModule: false,
          // 给图片重命名，[hash:10]去hash的前10位，[ext]取图片原来的文件名
          name: '[hash:10].[ext]'
        }
      },
      {
        // 处理html文件的img文件（负责引入img，从而能被url-loader处理）
        test: /\.html$/,
        loader: 'html-loader'
      },
      */
      {
        test: /\.(png|jpg|gif|svg)$/i,
      //  test: /\.html/,
        type: "asset/resource",
        // 方式二:优先级高于方式一
        // Rule.generator.filename 与 output.assetModuleFilename 相同，并且仅适用于 asset 和 asset/resource 模块类型。
        generator: {
          filename: 'static/[hash][ext][query]'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }), // 清理/dist文件夹
    new HtmlWebpackPlugin({
      title: 'Devepoment',
      // 复制./src/index.html，并自动映入打包输出的所有资源(css/js)
      template: './src/index.html'
    })

  ],
  // 开发服务器devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~）
  // 特点： 自会在内存中编译打包，不会有任何输出(不会生成/dist)。
  // 启动devServer指令为： webpack serve;也可以在package.json的scripts里添加"start": "webpack serve --open",

  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    port: 3030,
    https: true,
    // inline: false,
    open: 'Chrome', // macOS、Linux上是 'Google Chrome' ，在Windows上是 'Chrome' 。
    // watchOptions: {
    //   poll:true
    // },
  }
}