/**
 * createPersist
 *
 * @param  {String} namespace       namespace
 * @param  {Object} [initialState]  初始值/默认值
 * @param  {Object} [config]         自定义 provider/serialize/deserialize/expires
 * @return {Object}                 get/set 方法
 */
export default function (namespace, initialState = {}, config) {
  const {
    provider,
    serialize,
    deserialize,
    expires
  } = Object.assign({
    provider: localStorage,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
    expires: 0 // never expires
  }, config)

  if (!namespace) {
    namespace = rnd()
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

      return Object.assign({}, key === 'default' ? initialState : initialState[key], state)
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

export function rnd () {
  return Date.now().toString(32) + Math.random().toString(32).slice(2)
}
