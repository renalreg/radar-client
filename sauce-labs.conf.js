const webpackConfig = require('./webpack.config.js');

const customLaunchers = {
  sl_win10_chrome: {
    base: 'SauceLabs',
    platform: 'Windows 10',
    browserName: 'chrome'
  },

  sl_win10_firefox: {
    base: 'SauceLabs',
    platform: 'Windows 10',
    browserName: 'firefox'
  },

  sl_win10_edge: {
    base: 'SauceLabs',
    platform: 'Windows 10',
    browserName: 'MicrosoftEdge'
  }
};

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],

    files: ['src/app/test.js'],

    preprocessors: {
      'src/app/test.js': ['webpack', 'sourcemap']
    },

    reporters: ['dots', 'saucelabs'],

    browsers: Object.keys(customLaunchers),

    singleRun: true,

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    sauceLabs: {
      testName: 'Radar Unit Tests',
      recordScreenshots: false
    },

    customLaunchers: customLaunchers,

    captureTimeout: 120000
  });
};
