/*!
 * Vuex-LocalStorage v0.1.1
 * (c) 2016 Rich Lee
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.vuexLocalStorage = factory());
}(this, function () { 'use strict';

  /**
   * createPersist
   * @param  {String} key             key
   * @param  {Object} [initialState]  初始值/默认值
   * @param  {Object} [config]        自定义 provider/serialize/deserialize
   * @return {Object}                 get/set 方法
   */
  function index (key) {
    var initialState = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var config = arguments[2];

    var _Object$assign = Object.assign({
      provider: localStorage,
      serialize: JSON.stringify,
      deserialize: JSON.parse
    }, config);

    var provider = _Object$assign.provider;
    var serialize = _Object$assign.serialize;
    var deserialize = _Object$assign.deserialize;


    return {
      get: function get() {
        var state = {};

        try {
          state = deserialize(provider.getItem(key));
        } catch (e) {
          // console.log(e)
        }

        return Object.assign({}, initialState, state);
      },
      set: function set(val) {
        try {
          provider.setItem(key, serialize(val));
        } catch (e) {
          // console.log(e)
        }
      }
    };
  }

  return index;

}));