const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    'share-place': './src/SharePlace.js',
    'my-place': './src/MyPlace.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist', 'assets', 'scripts'),
    publicPath: 'dist/assets/scripts/',
  },
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                { useBuiltIns: 'usage', corejs: { version: 3 } },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['share-place'],
      template: './src/index.html',
      filename: '../../index.html',
      title: 'env.project',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['my-place'],
      template: './src/my-place/index.html',
      filename: '../../my-place/index.html',
      title: 'env.project',
    }),
    new CleanPlugin.CleanWebpackPlugin(),
  ],
};
