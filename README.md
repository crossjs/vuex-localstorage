# VUEX-LOCALSTORAGE

> :dvd: Sync [Vuex](https://github.com/vuejs/vuex) modules state to localStorage or some else storage.

[![Travis](https://img.shields.io/travis/crossjs/vuex-localstorage.svg?style=flat-square)](https://travis-ci.org/crossjs/vuex-localstorage)
[![Coveralls](https://img.shields.io/coveralls/crossjs/vuex-localstorage.svg?style=flat-square)](https://coveralls.io/github/crossjs/vuex-localstorage)
[![dependencies](https://david-dm.org/crossjs/vuex-localstorage.svg?style=flat-square)](https://david-dm.org/crossjs/vuex-localstorage)
[![devDependency Status](https://david-dm.org/crossjs/vuex-localstorage/dev-status.svg?style=flat-square)](https://david-dm.org/crossjs/vuex-localstorage?type=dev)
[![NPM version](https://img.shields.io/npm/v/vuex-localstorage.svg?style=flat-square)](https://npmjs.org/package/vuex-localstorage)

## Notice

It's NOT a Vuex plugin.

If you are looking for a Vuex plugin, see: https://github.com/robinvdvleuten/vuex-persistedstate

## Usage

[Live Example at PLATO](https://github.com/crossjs/plato/blob/master/src/store/modules/env.js#L12-L19)

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

With default key

``` js
const persist = createPersist()
persist.set({ foo: 'bar' }) // equals to persist.set('default', { foo: 'bar' })
persist.get() // equals to persist.get('default'), return { foo: 'bar' }
```

With customize keys

``` js
const persist = createPersist('my-namespace', { foo: { baz: 'bar' } })
persist.get() // return { foo: { baz: 'bar' } }
persist.get('foo') // return { baz: 'bar' }
persist.set('foo', { baz: 'baz' }) // should NOT override initialState
persist.get() // return { foo: { baz: 'bar' } }
persist.get('foo') // return { baz: 'baz' }
```

### Options

``` js
/**
 * createPersist
 * @param  {String} [namespace]     命名空间
 * @param  {Object} [initialState]  初始值/默认值
 * @param  {Object} [config]        配置 provider/serialize/deserialize/expires
 * @return {Object}                 带 get/set 方法的对象
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
