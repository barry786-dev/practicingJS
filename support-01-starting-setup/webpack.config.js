const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  mode: 'development',
  // watch: true,
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    // path: __dirname + '/dist',
    path: path.resolve(__dirname, 'assets', 'scripts'),
    // publicPath: './assets/scripts/',
  },
  target: 'web',
  devServer: {
    static: {
      directory: './',
    },
    watchFiles: ['./src/**/*.js'],
    hot: false,
    open: true,
    historyApiFallback: true,
    compress: true,
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: { version: 3 },
                },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin.CleanWebpackPlugin()],
};
