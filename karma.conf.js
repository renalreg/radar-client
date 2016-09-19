var webpack = require('./webpack.config.js');
webpack.entry = {};

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: ['src/app/test.js'],
    preprocessors: {
      'src/app/test.js': ['webpack', 'sourcemap']
    },
    reporters: ['dots', 'coverage'],
    port: 9876,
    browsers: ['PhantomJS'],
    webpack: webpack,
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    },
    coverageReporter: {
      dir : 'coverage',
      reporters: [
        {
          type: 'html',
          subdir: 'html'
        },
        {
          type: 'lcov',
          subdir: 'lcov'
        }
      ]
    }
  })
};
