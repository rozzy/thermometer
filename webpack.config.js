'use strict';

var webpack = require('webpack');
require('es6-promise').polyfill();

module.exports = {
  entry: [
    'webpack/hot/only-dev-server',
    "./js/app"
  ],
  output: {
    path: __dirname + '/build',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loaders: [
          'react-hot',
          'babel?presets[]=stage-0,presets[]=react,presets[]=es2015'
        ],
        exclude: /node_modules/,
      },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'React': 'react',
      'ReactDOM': 'react-dom'
    }),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  }
};
