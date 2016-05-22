/**
 * createPersist
 * @param  {String} key             key
 * @param  {Object} [initialState]  初始值/默认值
 * @param  {Object} [config]        自定义 provider/serialize/deserialize
 * @return {Object}                 get/set 方法
 */
export default function (key, initialState = {}, config) {
  const {
    provider,
    serialize,
    deserialize
  } = Object.assign({
    provider: localStorage,
    serialize: JSON.stringify,
    deserialize: JSON.parse
  }, config)

  return {
    get () {
      let state = {}

      try {
        state = deserialize(provider.getItem(key))
      } catch (e) {
        // console.log(e)
      }

      return Object.assign({}, initialState, state)
    },
    set (val) {
      try {
        provider.setItem(key, serialize(val))
      } catch (e) {
        // console.log(e)
      }
    }
  }
}
