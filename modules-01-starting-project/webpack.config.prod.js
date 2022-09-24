const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  // watch: true,
  entry: './src/app.js',
  output: {
    filename: '[contenthash].js',
    // path: __dirname + '/dist',
    path: path.resolve(__dirname, 'assets', 'scripts'),
    // publicPath: './assets/scripts/',
  },
  target: 'web',
  devtool: 'cheap-source-map',
  plugins: [new CleanWebpackPlugin.CleanWebpackPlugin()],
};
