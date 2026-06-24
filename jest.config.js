module.exports = {
  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.[tj]s$': 'babel-jest',
  },

  moduleFileExtensions: ['js', 'json'],

  testMatch: ['**/tests/**/*.test.js', '**/tests/**/*.spec.js'],

  transformIgnorePatterns: [
    '/node_modules/'
  ]
};
