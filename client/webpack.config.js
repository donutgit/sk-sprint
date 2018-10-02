const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

const DIR = path.resolve(__dirname);
const config = {
  mode: "development",
  devtool: "source-map-loader",
  entry: path.join(DIR, "src/index.tsx"),
  output: {
    filename: "bundle.js",
    path: DIR + "/dist",
    publicPath: "/"
  },

  resolve: {
    extensions: [" ", ".ts", ".tsx", ".js", ".svg", ".json"],
    alias: {
      src: path.resolve(DIR, "src")
    }
  },
  devServer: {
    host: process.env.HOST || "localhost",
    hot: true,
    progress: true,
    port: process.env.FRONT_PORT || 3001,
    historyApiFallback: true,
    contentBase: path.join(DIR, "dist")
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.css$/,
        include: path.join(DIR, "src"),
        loaders: [
          "style-loader",
          {
            loader: "typings-for-css-modules-loader",
            options: {
              modules: true,
              namedExport: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(DIR, "index.html")
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(DIR, "public"),
    //     to: path.resolve(DIR, "dist/public")
    //   }
    // ])
  ],
  node: {
    fs: "empty"
  }
};

module.exports = config;
