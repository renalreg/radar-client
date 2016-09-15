var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var production = process.env.NODE_ENV === 'production';

var config = {
  devtool: 'source-map',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        pathRewrite: {'^/api' : ''}
      }
    }
  },
  entry: [
    'babel-polyfill',
    './src/app/index.js',
    './src/sass/app.scss',
    'bootstrap-sass/assets/javascripts/bootstrap.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'assets/bundle.[hash].js'
  },
  module: {
    noParse: [
      path.resolve('node_modules/quill/dist/quill.js') // TODO remove when upgrading to Quill 1.0
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          plugins: ['transform-es3-property-literals', 'transform-es3-member-expression-literals']
        }
      },
      {
        test: /\.html$/,
        loaders: ['ngtemplate?relativeTo=' + __dirname + '/', 'html']
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', ['css?sourceMap', 'sass?sourceMap'], {publicPath: '../'})
      },
      {
        test: /\.(woff2?|ttf|eot)(\?.*)?$/,
        loader: 'file',
        query: {
          name: 'assets/fonts/[name].[hash].[ext]'
        }
      },
      {
        test: /\.(svg|png)(\?.*)?$/,
        loader: 'file',
        query: {
          name: 'assets/images/[name].[hash].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '!!html-loader!src/index.html'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new ExtractTextPlugin('assets/bundle.[contentHash].css')
  ]
}

if (production) {
  var uglify = new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  });

  config.plugins.push(uglify);
}

module.exports = config;
