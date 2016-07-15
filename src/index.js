/**
 * createPersist
 * @param  {String} key             key
 * @param  {Object} [initialState]  初始值/默认值
 * @param  {Object} [config]        自定义 provider/serialize/deserialize/expires
 * @return {Object}                 get/set 方法
 */
export default function (key, initialState = {}, config) {
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

  return {
    get () {
      let state

      try {
        const { value, expires } = deserialize(provider.getItem(key))
        if (expires === 0 || expires > new Date().getTime()) {
          state = deserialize(value)
        }
      } catch (e) {
        // console.log(e)
      }

      return Object.assign({}, initialState, state)
    },
    set (value) {
      try {
        provider.setItem(key, serialize({
          value: serialize(value),
          expires: expires ? expires + new Date().getTime() : expires
        }))
      } catch (e) {
        // console.log(e)
      }
    }
  }
}
