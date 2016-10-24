var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry: './app/main.js',
  output: { 
    path: './app/', 
    filename: 'bundle.js' 
  },
  watch: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
            'style', // The backup style loader
            'css?sourceMap!sass?sourceMap'
        )
      }
    ]
  },
  plugins: [
      new ExtractTextPlugin('assets/css/styles.css')
  ]
};