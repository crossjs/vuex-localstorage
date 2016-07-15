# VUEX-LOCALSTORAGE

> :dvd: Sync [Vuex](https://github.com/vuejs/vuex) modules state to localStorage or some else storage.

[![Travis](https://img.shields.io/travis/crossjs/vuex-localstorage.svg?style=flat-square)](https://travis-ci.org/crossjs/vuex-localstorage)
[![Coveralls](https://img.shields.io/coveralls/crossjs/vuex-localstorage.svg?style=flat-square)](https://coveralls.io/github/crossjs/vuex-localstorage)
[![dependencies](https://david-dm.org/crossjs/vuex-localstorage.svg?style=flat-square)](https://david-dm.org/crossjs/vuex-localstorage)
[![devDependency Status](https://david-dm.org/crossjs/vuex-localstorage/dev-status.svg?style=flat-square)](https://david-dm.org/crossjs/vuex-localstorage#info=devDependencies)
[![NPM version](https://img.shields.io/npm/v/vuex-localstorage.svg?style=flat-square)](https://npmjs.org/package/vuex-localstorage)


## Usage

``` js
import createPersist from 'vuex-localstorage'
import { SET_ENV } from '../types'
import { ENV_KEY } from '../constants'

const persist = createPersist(ENV_KEY, {
  lang: navigator.language.split('-')[0]
})

const state = {
  env: persist.get()
}

const mutations = {
  [SET_ENV] (state, { payload }) {
    Object.assign(state.env, payload)
    persist.set(state.env)
  }
}

export default {
  state,
  mutations
}
```

### Options

``` js
/**
 * createPersist
 * @param  {String} key             key
 * @param  {Object} [initialState]  初始值/默认值
 * @param  {Object} [config]        自定义 provider/serialize/deserialize/expires
 * @return {Object}                 get/set 方法
 */
```

### Development Setup

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

## License

[MIT](http://opensource.org/licenses/MIT)
