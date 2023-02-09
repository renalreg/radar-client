#!/bin/bash

set -e

cd "$(dirname "$0")"

<<<<<<< HEAD
#npm run lint
#npm test
=======
# npm run lint
# npm test
>>>>>>> master
NODE_ENV=production npm run build

version=$(node -e "console.log(require('./package.json').version);")
tar --transform "s/^dist/radar-client-$version/" -czf "radar-client-$version.tar.gz" dist
