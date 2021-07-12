const path = require('path');
const HtmlwebPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const CssMinizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')


module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/images/[hash][ext][query]'
  },
  resolve: {
    extensions: [".js"],
  }, 
  module:{
      rules:[
          {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use:{
                  loader:'babel-loader'
              }
          },
          {
            test: /\.css$/i,
            use:[
              MiniCssExtractPlugin.loader,
              'css-loader',
              
            ]
          },
          {
            test: /\.png$/,
            type:'asset/resource'
          },
      ]
  },
  plugins:[
      new HtmlwebPlugin({
          inject: "body",
          template:'./public/index.html',
          filename:'./index.html'
      }),
      new MiniCssExtractPlugin({
        filename:'assets/[name].[contenthash].css'
      }),
  ],
  optimization:{
    minimize: true,
    minimizer:[
      new TerserPlugin(),
      new CssMinizerPlugin(),
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000,
    bonjour: true,
  },
};
