// webpack.config.js
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: "./templates/src/index.jsx",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ]
  },
  resolve: { 
    extensions: ["*", ".js", ".jsx"],
    alias: {
      '~': path.join(__dirname, './src'),
      'Views': path.join(__dirname, './src/views'),
      'Components': path.join(__dirname, './src/components'),
    } 
  },
  output: {
    path: path.resolve(__dirname, "static/dist/"),
    publicPath: "/static/dist/",
    filename: '[name].[contenthash].js',
  },
  devServer: {
    contentBase: path.join(__dirname, "static/"),
    host: '192.168.1.32',
    inline: true,
    port: 3000,
    publicPath: "http://127.0.0.1:5000/dist/",
    hotOnly: true,
    historyApiFallback: true
  },
  plugins: 
     [
      //new webpack.HotModuleReplacementPlugin(),
      new webpack.EnvironmentPlugin( { ...process.env } ),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        hash: true,
        template: path.resolve(__dirname, "./templates/index.html"),
        filename: './index.html' //relative to root of the application
    })
    ]
    
};