# RADAR Client

This repository is the home of the RADAR (Rare Disease Registry) web interface.
The application is built using the [AngularJS](https://angularjs.org/) framework and bundled for browsers using [webpack](https://webpack.github.io/).
The application communicates with the [RADAR API](https://github.com/renalreg/radar).

## Build Status

[![Travis](https://img.shields.io/travis/renalreg/radar-client/master.svg)](https://travis-ci.org/renalreg/radar-client) [![Coveralls](https://img.shields.io/coveralls/renalreg/radar-client.svg)](https://coveralls.io/github/renalreg/radar-client) [![David](https://img.shields.io/david/dev/renalreg/radar-client.svg)](https://david-dm.org/renalreg/radar-client?type=dev)

[![Sauce Labs](https://saucelabs.com/browser-matrix/radar.svg)](https://saucelabs.com/u/radar)

## Getting Started

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed (npm is included with Node.js).

Clone the repository:

```sh
git clone https://github.com/renalreg/radar-client.git
cd radar-client
```

Install the dependencies:

```sh
npm install
```

Start the development server:

```sh
npm start
```

The development server is available at [http://localhost:8080/](http://localhost:8080/) and with live reloading at [http://localhost:8080/webpack-dev-server/](http://localhost:8080/webpack-dev-server/).

## npm scripts

* `start` - start the development server.
* `clean` - remove build output.
* `build` - build the client in the `dist` folder.
* `lint` - lint the source code with [ESLint](http://eslint.org/).
* `test` - run the tests with [Karma](https://karma-runner.github.io/).
* `sauce-labs` - run the tests on all supported browsers using [Sauce Labs](https://saucelabs.com/).

## Development Guide

Run the development server with the `npm start` command.
This will start a development server listening on `http://localhost:8080/`.
If you are using a VM you might want to listen on all interfaces with the `--host 0.0.0.0` argument.
You can pass extra arguments to `npm start` using the `--` separator.
For example `npm start -- --host 0.0.0.0`.

The development server proxies requests to `/api` to the API running on `localhost:5000`.

The code is automatically linted and tested by [Travis CI](https://travis-ci.org/).
Lint errors or test failures will prevent a package being built with `./build.sh`.

### Lint

The JavaScript code can be linted with the ESLint tool.
The coding style is two-spaces for indentation, single-quotes, and semi-colons.

Lint the code with:

```sh
npm run lint
```

### Test

The tests are written using the [Jasmine](http://jasmine.github.io/) framework and run using [Karma](https://karma-runner.github.io/).
Test files have the `.test.js` extension and are normally named after the file they are testing.

Run the tests with:

```sh
npm test
```

A HTML coverage report is saved to the `coverage/html` directory.

## Deployment Guide

Build a `.tar.gz`:

```sh
./build.sh
```

This will lint the code, run the tests, build the client and create an archive ready for distribution.
The client will be built in production mode (`NODE_ENV=production`) which will minify the output.

Deploy the `.tar.gz` to servers:

```sh
virtualenv venv
. venv/bin/activate
pip install fabric

fab -H nww.radar.nhs.uk -u root deploy
```

The `--gateway` option is useful for tunneling through another server.
