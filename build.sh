#!/bin/bash

set -e

cd "$(dirname "$0")"
version=$(node -e "console.log(require('./package.json').version);")
gulp build:dist
tar --transform "s/^dist/radar-client-$version/" -czf "radar-client-$version.tar.gz" dist
