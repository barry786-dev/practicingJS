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
    port: 3003,
    hot: false,
    open: true,
    historyApiFallback: true,
    compress: true,
  },
  devtool: 'cheap-module-source-map',
  plugins: [new CleanWebpackPlugin.CleanWebpackPlugin()],
};

/* entry: {
    welcome: './src/welcome-page/welcome.js',
    about: './src/about-page/about.js',
    // etc.
} */
