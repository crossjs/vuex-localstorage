import { createStorage } from '../../../src'

localStorage.clear()

describe('getStorage', () => {
  it('init', () => {
    const storage = createStorage()
    expect(storage.get()).to.eql({})
  })

  it('with initialState', () => {
    const storage = createStorage({
      initialState: { x: 1 }
    })
    expect(storage.get()).to.eql({ x: 1 })
  })

  it('key should default to `default`', () => {
    const storage = createStorage({
      initialState: { x: 1 }
    })
    expect(storage.get()).to.eql({ x: 1 })
    expect(storage.get('default')).to.eql({ x: 1 })
  })
})

describe('setStorage', () => {
  it('with initialState', () => {
    const storage = createStorage({
      initialState: { z: 1 }
    })
    storage.set({ y: 1 })
    expect(storage.get()).to.eql({ y: 1, z: 1 })
  })

  it('key should default to `default`', () => {
    const storage = createStorage({
      initialState: { z: 1 }
    })
    storage.set({ y: 1 })
    expect(storage.get()).to.eql({ y: 1, z: 1 })
  })

  it('override initialState', () => {
    const storage = createStorage({
      initialState: { z: 1 }
    })
    storage.set({ z: 0 })
    expect(storage.get()).to.eql({ z: 0 })
    storage.set({ z: null })
    expect(storage.get()).to.eql({ z: null })
  })

  describe('with key', () => {
    it('with initialState', () => {
      const storage = createStorage({
        initialState: { z: 1 }
      })
      storage.set('key1', { y: 1 })
      expect(storage.get('key1')).to.eql({ y: 1 })
      expect(storage.get()).to.eql({ z: 1 })
    })

    it('override initialState', () => {
      const storage = createStorage({
        initialState: { z: 1 }
      })
      expect(storage.get()).to.eql({ z: 1 })
      storage.set('key2', { z: 0 })
      expect(storage.get('key2')).to.eql({ z: 0 })
      storage.set('key2', { z: null })
      expect(storage.get('key2')).to.eql({ z: null })
      storage.set('key3', { z: '' })
      expect(storage.get('key3')).to.eql({ z: '' })
    })
  })
})

describe('customize', () => {
  it('with sessionStorage', () => {
    const storage = createStorage({
      initialState: { z: 1 },
      provider: sessionStorage
    })
    storage.set({ y: 1 })
    expect(storage.get()).to.eql({ y: 1, z: 1 })
  })

  it('serialize/deserialize', () => {
    const value = {}
    const storage = createStorage({
      initialState: { z: 1 },
      provider: {
        getItem (key) {
          return value[key]
        },
        setItem (key, val) {
          value[key] = val
        }
      },
      serialize: val => val,
      deserialize: val => val
    })
    storage.set({ z: 0 })
    expect(storage.get()).to.eql({ z: 0 })
    storage.set({ z: null })
    expect(storage.get()).to.eql({ z: null })
  })

  it('with expires', done => {
    const storage = createStorage({
      initialState: { z: 1 },
      // one second
      expires: 1000
    })
    storage.set({ y: 1 })
    expect(storage.get()).to.eql({ y: 1, z: 1 })
    setTimeout(() => {
      expect(storage.get()).to.eql({ z: 1 })
      done()
    }, 1000)
  })

  it('with merge', done => {
    const storage = createStorage({
      initialState: { z: 1 },
      merge (a, b) {
        // always return storaged
        return b
      },
      // one second
      expires: 1000
    })
    storage.set({ y: 1 })
    expect(storage.get()).to.eql({ y: 1 })
    setTimeout(() => {
      // expired to undefined
      expect(storage.get()).to.be.undifined
      done()
    }, 1000)
  })
})
