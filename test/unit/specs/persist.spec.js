import createPersist from '../../../src'

import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

let index = 0

function setItem (namespace, value) {
  localStorage.setItem(`${namespace}-default`, JSON.stringify({
    value: JSON.stringify(value),
    expires: 0
  }))
}

function getItem (namespace) {
  return JSON.parse(JSON.parse(localStorage.getItem(`${namespace}-default`)).value)
}

localStorage.clear()

it('replaces store\'s state and subscribes to changes when initializing', () => {
  const namespace = `vuex-${++index}`
  setItem(namespace, { persisted: 'json' })

  const store = new Store({
    state: { original: 'state' }
  })
  sinon.spy(store, 'replaceState')
  sinon.spy(store, 'subscribe')

  createPersist({ namespace })(store)

  assert(store.replaceState.calledWith({ original: 'state', persisted: 'json' }))
  assert(store.subscribe.called)
})

it('respects nested values when it replaces store\'s state on initializing', () => {
  const namespace = `vuex-${++index}`
  setItem(namespace, {
    nested: { persisted: 'json' }
  })

  const store = new Store({
    state: {
      nested: { original: 'state' }
    }
  })
  sinon.spy(store, 'replaceState')
  sinon.spy(store, 'subscribe')

  createPersist({ namespace })(store)

  assert(store.replaceState.calledWith({
    nested: { persisted: 'json' }
  }))
  assert(store.subscribe.called)
})

it('persist the changed parial state back to serialized JSON', () => {
  const namespace = `vuex-${++index}`
  const store = new Store({
    state: {}
  })
  sinon.spy(store, 'replaceState')
  sinon.spy(store, 'subscribe')

  createPersist({ namespace, paths: ['changed'] })(store)

  const subscriber = store.subscribe.getCall(0).args[0]
  subscriber('mutation', { changed: 'state' })

  assert.deepEqual(getItem(namespace), { changed: 'state' })
})

it('persist the changed partial state back to serialized JSON under a configured key', () => {
  const store = new Store({
    state: {}
  })
  sinon.spy(store, 'replaceState')
  sinon.spy(store, 'subscribe')

  createPersist({ namespace: 'custom', paths: ['changed'] })(store)

  const subscriber = store.subscribe.getCall(0).args[0]
  subscriber('mutation', { changed: 'state' })

  assert.deepEqual(getItem('custom'), { changed: 'state' })
})

it('persist the changed full state back to serialized JSON when no paths are given', () => {
  const namespace = `vuex-${++index}`
  const store = new Store({
    state: {}
  })
  sinon.spy(store, 'replaceState')
  sinon.spy(store, 'subscribe')

  createPersist({ namespace })(store)

  const subscriber = store.subscribe.getCall(0).args[0]
  subscriber('mutation', { changed: 'state' })

  assert.deepEqual(getItem(namespace), { changed: 'state' })
})

it('uses the configured reducer when persisting the state', () => {
  const store = new Store({
    state: {}
  })
  sinon.spy(store, 'replaceState')
  sinon.spy(store, 'subscribe')

  const customReducer = sinon.spy()

  const plugin = createPersist({ paths: ['custom'], reducer: customReducer })
  plugin(store)

  const subscriber = store.subscribe.getCall(0).args[0]
  subscriber('mutation', { custom: 'value' })

  assert(customReducer.calledWith({ custom: 'value' }, ['custom']))
})
