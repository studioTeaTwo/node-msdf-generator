# node-msdf-generator
[![npm version](https://badge.fury.io/js/msdf-generator.svg)](https://badge.fury.io/js/msdf-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Install

Install with [npm](https://www.npmjs.com/):

    npm install --save-dev msdf-generator


## Publish

Update the source and increment the version in package.json.
And then:

    npm run build
    npm run prepare
    git tag -a v[current version] -m 'version [current version]'
    git push origin v[current version]
    npm publish