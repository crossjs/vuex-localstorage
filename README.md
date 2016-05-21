# vuex-localstorage
[![Travis](https://img.shields.io/travis/crossjs/vuex-localstorage.svg?style=flat-square)](https://github.com/crossjs/vuex-localstorage)
[![Coveralls](https://img.shields.io/coveralls/crossjs/vuex-localstorage.svg?style=flat-square)](https://github.com/crossjs/vuex-localstorage)
[![NPM version](https://img.shields.io/npm/v/vuex-localstorage.svg?style=flat-square)](https://npmjs.org/package/vuex-localstorage)


### Introduction

Sync [Vuex](https://github.com/vuejs/vuex) modules state to localStorage.

``` js
import { getPersist, setPersist } from 'vuex-localstorage'
import { SET_ENV } from '../types'
import { ENV_KEY } from '../constants'

const state = {
  env: getPersist(ENV_KEY, {
    lang: navigator.language.split('-')[0]
  })
}

const mutations = {
  [SET_ENV] (state, { payload }) {
    state.env = Object.assign({}, state.env, payload)
    setPersist(ENV_KEY, state.env)
  }
}

export default {
  state,
  mutations
}
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
