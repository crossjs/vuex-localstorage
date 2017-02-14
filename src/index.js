let index = Date.now()

/**
 * createStorage
 *
 * @param  {String} namespace       namespace
 * @param  {Object} [initialState]  初始值/默认值
 * @param  {Object} [config]         自定义 provider/serialize/deserialize/expires
 * @return {Object}                 get/set 方法
 */
export function createStorage ({
  namespace,
  initialState = {},
  provider = localStorage,
  serialize = JSON.stringify,
  deserialize = JSON.parse,
  expires = 0, // never expires
  merge = defaultMerge
} = {}) {
  if (!namespace) {
    namespace = `vuex-${++index}`
  }

  return {
    /**
     * get
     *
     * @param  {String} key   key, defaults to 'default'
     * @return {Object}       plain object
     */
    get (key = 'default') {
      let state

      try {
        const { value, expires } = deserialize(provider.getItem(`${namespace}-${key}`))
        if (expires === 0 || expires > Date.now()) {
          // always a plain object
          state = deserialize(value)
        }
      } catch (e) {
        // console.log(e)
      }

      return merge(key === 'default' ? initialState : initialState[key], state)
    },
    /**
     * set
     *
     * @param  {String} key   key
     * @param  {Object} value plain object
     * @return {undifined}
     */
    set (key, value) {
      if (arguments.length === 1) {
        value = key
        key = 'default'
      }
      try {
        provider.setItem(`${namespace}-${key}`, serialize({
          value: serialize(value),
          expires: expires ? expires + Date.now() : expires
        }))
      } catch (e) {
        // console.log(e)
      }
    }
  }
}

export default function createPersist ({
  namespace,
  initialState,
  provider,
  serialize,
  deserialize,
  expires,
  merge = defaultMerge,
  reducer = defaultReducer,
  paths = []
} = {}) {
  return store => {
    const storage = createStorage({
      namespace,
      initialState,
      provider,
      serialize,
      deserialize,
      merge,
      expires
    })

    store.replaceState(
      merge(store.state, storage.get())
    )

    store.subscribe((mutation, state) => {
      storage.set(reducer(state, paths))
    })
  }
}

function defaultMerge (...args) {
  return Object.assign({}, ...args)
}

function defaultReducer (state, paths) {
  return paths.length === 0
  ? state
  : paths.reduce((substate, path) => {
    if (state.hasOwnProperty(path)) {
      return Object.assign(substate, { [path]: state[path] })
    }
    return substate
  }, {})
}
