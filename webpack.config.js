var path = require('path');
var webpack = require('webpack');
var DashboardPlugin = require('webpack-dashboard/plugin');


var babelPresets = {presets: ['react', 'es2015', 'stage-2']};

module.exports = {
  entry: [
    'babel-polyfill',
    //'webpack-dev-server/client?http://localhost:3000',
    //'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/static/',
    filename: 'app.bundle.js',
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
    }),
    //new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /(\.js$|\.jsx$)/,
        exclude: /node_modules/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.less$/,
        loaders: ['style', 'css', 'less'],
      },
      {
        test: /\.png$/,
        loader: 'url',
      },
      {
        test: /\.svg$/,
        loader: 'file',
      },
      {
        test: /\.ttf$|\.eot$/,
        loader: 'file',
      },
      {
        test: /\.woff$/,
        loader: "file-loader"
      },
    ]
  }
};
