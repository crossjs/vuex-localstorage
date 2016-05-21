/*!
 * Vuex-LocalStorage v0.0.1
 * (c) 2016 Rich Lee
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.vuexLocalStorage = global.vuexLocalStorage || {})));
}(this, function (exports) { 'use strict';

  function getPersist(key) {
    var initialState = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var state = {};

    try {
      state = JSON.parse(localStorage.getItem(key));
    } catch (e) {
      // console.log(e)
    }

    return Object.assign({}, initialState, state);
  }

  function setPersist(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      // console.log(e)
    }
  }

  exports.getPersist = getPersist;
  exports.setPersist = setPersist;

}));