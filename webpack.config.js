var webpack = require('webpack');

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
  entry: './src/entry.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
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
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.(woff2?|ttf|eot|svg|png)(\?.*)?$/,
        loader: 'file' // TODO filenames
      }
    ]
  }
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