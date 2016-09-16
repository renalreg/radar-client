var webpack = require('./webpack.config.js');
webpack.entry = {};

var customLaunchers = {
  'sl_win7_chrome': {
    base: 'SauceLabs',
    platform: 'Windows 7',
    browserName: 'chrome'
  },
  'sl_win7_firefox': {
    base: 'SauceLabs',
    platform: 'Windows 7',
    browserName: 'firefox'
  },
  'sl_win7_ie8': {
    base: 'SauceLabs',
    platform: 'Windows 7',
    browserName: 'internet explorer',
    version: '8'
  },
  'sl_win7_ie9': {
    base: 'SauceLabs',
    platform: 'Windows 7',
    browserName: 'internet explorer',
    version: '9'
  },
  'sl_win7_ie10': {
    base: 'SauceLabs',
    platform: 'Windows 7',
    browserName: 'internet explorer',
    version: '10'
  },
  'sl_win7_ie11': {
    base: 'SauceLabs',
    platform: 'Windows 7',
    browserName: 'internet explorer',
    version: '11'
  }
};

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'src/app/test.js'
    ],
    preprocessors: {
      'src/app/test.js': ['webpack', 'sourcemap']
    },
    reporters: ['dots', 'saucelabs'],
    browsers: Object.keys(customLaunchers),
    singleRun: true,
    webpack: webpack,
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    },
    sauceLabs: {
      testName: 'Radar Unit Tests',
      recordScreenshots: false
    },
    customLaunchers: customLaunchers,
    captureTimeout: 120000
  })
};
