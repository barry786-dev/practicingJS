const path = require('path');
const Dotenv = require('dotenv-webpack');
// const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    SharePlace: './src/SharePlace.js',
    MyPlace: './src/MyPlace.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist', 'assets', 'scripts'),
    publicPath: '/assets/scripts',
    clean: true,
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['SharePlace'],
      template: './src/index.html',
      filename: '../../index.html',
      title: 'env.project',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['MyPlace'],
      template: './src/my-place/index.html',
      filename: '../../my-place/index.html',
      title: 'env.project',
    }),
  ],
  target: 'web',
  devServer: {
    static: {
      directory: './dist',
    },
    watchFiles: ['./src/**/*.js', './src/**/*.html'],
    hot: false,
    open: true,
    historyApiFallback: true,
    port: 9000,
    compress: true,
  },
  devtool: 'cheap-module-source-map',
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
  // plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
