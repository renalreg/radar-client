var webpack = require('./webpack.config.js');
webpack.entry = {};

module.exports = function(config) {
  config.set({
    basePath: 'src/app',
    frameworks: ['jasmine'],
    files: ['test.js'],
    preprocessors: {
      'test.js': ['webpack', 'sourcemap']
    },
    reporters: ['dots'],
    port: 9876,
    colors: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    webpack: webpack,
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    }
  })
};
