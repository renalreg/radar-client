var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var production = process.env.NODE_ENV === 'production';

module.exports = {
  mode: production ? 'production' : 'development',

  devtool: production ? 'source-map' : 'inline-source-map',

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },

    proxy: [
      {
        context: ['/api'],
        target: 'http://radar-api:5000',
        pathRewrite: { '^/api': '' }
      },
      {
        context: ['/admin'],
        target: 'http://radar-admin:5002'
      }
    ],

    watchFiles: ['src/**/*'],
    hot: true
  },

  entry: [
    './src/app/index.js',
    './src/sass/app.scss',
    'bootstrap-sass/assets/javascripts/bootstrap.js'
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/bundle.[contenthash].js',
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      {
        test: /\.html$/,
        use: 'html-loader'
      },

      {
        test: /\.scss$/,
        use: [
          production ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              api: 'modern-compiler',        // fixes: legacy JS API warning
              sassOptions: {
                quietDeps: true,             // silences warnings from node_modules (bootstrap-sass)
                silenceDeprecations: ['import', 'global-builtin'], // suppress until migration is complete
              },
            },
          },
        ]
      },

      {
        test: /\.(woff2?|ttf|eot|svg|png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[contenthash][ext]'
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      favicon: './src/favicon.ico'
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),

    ...(production
      ? [
        new MiniCssExtractPlugin({
          filename: 'assets/bundle.[contenthash].css'
        })
      ]
      : [])
  ]
};
