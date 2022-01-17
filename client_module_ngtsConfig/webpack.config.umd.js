const path = require("path");
const WebpackMd5Hash = require("webpack-md5-hash");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleNotFoundPlugin = require("react-dev-utils/ModuleNotFoundPlugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { name } = require("./package.json");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

const distDir = path.join(process.cwd(), "dist");
// const distDir =
//   "C:\\Users\\Sakura\\AppData\\Local\\Programs\\wanyan_client\\resources\\app\\wy_modules\\wy_module_ngtsConfig";

module.exports = {
  mode: "development",
  entry: { [name]: "./src/index.js" },
  output: {
    path: distDir,
    filename: "[name].min.js",
    publicPath: "../../wy_modules/wy_module_ngtsConfig/",
    // 采用通用模块定义
    libraryTarget: "umd",
    library: name,
  },
  devtool: "#source-map",
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            //loader要设置相关参数时可以使用对象
            loader: "style-loader",
          },
          {
            //loader要设置相关参数时可以使用对象
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: {
          loader: require.resolve("url-loader"),
        },
      },
      {
        test: /\.ttf$/,
        use: ["file-loader"],
      },
      ///new here
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    enforceExtension: false,
    extensions: [".js", ".jsx", ".json", ".less", ".css", ".scss"],
  },
  stats: { children: false },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [distDir],
    }),
    // new MiniCssExtractPlugin({
    //     filename: '[name].css'
    // }),
    new MonacoWebpackPlugin([
      "apex",
      "azcli",
      "bat",
      "clojure",
      "coffee",
      "cpp",
      "csharp",
      "csp",
      "css",
      "dockerfile",
      "fsharp",
      "go",
      "handlebars",
      "html",
      "ini",
      "java",
      "javascript",
      "json",
      "less",
      "lua",
      "markdown",
      "msdax",
      "mysql",
      "objective",
      "perl",
      "pgsql",
      "php",
      "postiats",
      "powerquery",
      "powershell",
      "pug",
      "python",
      "r",
      "razor",
      "redis",
      "redshift",
      "ruby",
      "rust",
      "sb",
      "scheme",
      "scss",
      "shell",
      "solidity",
      "sql",
      "st",
      "swift",
      "typescript",
      "vb",
      "xml",
      "yaml",
    ]),
    new WebpackMd5Hash(),
    new ModuleNotFoundPlugin("."),
    // new webpack.BannerPlugin(` \n ${name} v${version} \n ${description} ${fs.readFileSync(path.join(process.cwd(), "LICENSE"))}`)
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: "./public/index.html",
        },
        {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            // removeRedundantAttributes: true,
            // useShortDoctype: true,
            removeEmptyAttributes: true,
          },
        }
      )
    ),
  ],
  node: {
    setImmediate: false,
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty",
  },
  target: "electron-renderer",
};
