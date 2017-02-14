# VUEX-LOCALSTORAGE

> :dvd: Persist Vuex state with expires by localStorage or some else storage.

[![Travis](https://img.shields.io/travis/crossjs/vuex-localstorage.svg?style=flat-square)](https://travis-ci.org/crossjs/vuex-localstorage)
[![Coveralls](https://img.shields.io/coveralls/crossjs/vuex-localstorage.svg?style=flat-square)](https://coveralls.io/github/crossjs/vuex-localstorage)
[![dependencies](https://david-dm.org/crossjs/vuex-localstorage.svg?style=flat-square)](https://david-dm.org/crossjs/vuex-localstorage)
[![devDependency Status](https://david-dm.org/crossjs/vuex-localstorage/dev-status.svg?style=flat-square)](https://david-dm.org/crossjs/vuex-localstorage?type=dev)
[![NPM version](https://img.shields.io/npm/v/vuex-localstorage.svg?style=flat-square)](https://npmjs.org/package/vuex-localstorage)

## Usage

``` js
import { Store } from 'vuex'
import createPersist, { createStorage } from 'vuex-localstorage'

new Store({
  plugins: [createPersist({
    namespace: 'namespace-for-state'
    initialState: {},
    // ONE_WEEK
    expires: 7 * 24 * 60 * 60 * 1e3
  })]
}
```

[Live Example at PLATO](https://github.com/platojs/plato/blob/master/src/modules/persist/index.js)

## Development Setup

``` bash
# install deps
npm install

# build dist files
npm run build

# lint & run all tests
npm test

# run unit tests only
npm run unit
```

## Special Thanks

[vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate)

## License

[MIT](http://opensource.org/licenses/MIT)
