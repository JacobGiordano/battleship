const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/template.html"),
    })
  ],
  devtool: "source-map",
  devServer: {
    static: path.resolve(__dirname, "dist"),
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader", //2. Inject styles into DOM
          "css-loader", //1. Turns css into commonjs
        ]
      }
    ]
  }
});