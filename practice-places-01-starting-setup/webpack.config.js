const path = require('path');
const Dotenv = require('dotenv-webpack');
//const CleanPlugin = require('clean-webpack-plugin');
//const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    SharePlace: './src/SharePlace.js',
    MyPlace: './src/MyPlace.js',
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     title: 'Output Management',
  //     title: 'Development',
  //   }),
  // ],
  plugins: [new Dotenv()],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist', 'assets', 'scripts'),
    publicPath: '/assets/scripts',
    clean: true,
  },
  target: 'web',
  devServer: {
    static: {
      directory: './dist',
    },
    watchFiles: ['./src/**/*.js'],
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
