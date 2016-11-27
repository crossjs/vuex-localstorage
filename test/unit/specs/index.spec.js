import createPersist, { rnd } from '../../../src'

describe('getPersist', () => {
  it('init', () => {
    const persist = createPersist(rnd())
    expect(persist.get()).to.eql({})
  })

  it('with initialState', () => {
    const persist = createPersist(rnd(), { x: 1 })
    expect(persist.get()).to.eql({ x: 1 })
  })

  it('with empty namespace', () => {
    const persist = createPersist(null, { x: 1 })
    expect(persist.get()).to.eql({ x: 1 })
  })

  it('key should default to `default`', () => {
    const persist = createPersist(null, { x: 1 })
    expect(persist.get()).to.eql({ x: 1 })
    expect(persist.get('default')).to.eql({ x: 1 })
  })
})

describe('setPersist', () => {
  it('with initialState', () => {
    const persist = createPersist(rnd(), { z: 1 })
    persist.set({ y: 1 })
    expect(persist.get()).to.eql({ y: 1, z: 1 })
  })

  it('key should default to `default`', () => {
    const persist = createPersist(rnd(), { z: 1 })
    persist.set({ y: 1 })
    expect(persist.get()).to.eql({ y: 1, z: 1 })
  })

  it('override initialState', () => {
    const persist = createPersist(rnd(), { z: 1 })
    persist.set({ z: 0 })
    expect(persist.get()).to.eql({ z: 0 })
    persist.set({ z: null })
    expect(persist.get()).to.eql({ z: null })
  })

  describe('with key', () => {
    it('with initialState', () => {
      const persist = createPersist(rnd(), { z: 1 })
      persist.set('key1', { y: 1 })
      expect(persist.get('key1')).to.eql({ y: 1 })
      expect(persist.get()).to.eql({ z: 1 })
    })

    it('override initialState', () => {
      const persist = createPersist(rnd(), { z: 1 })
      expect(persist.get()).to.eql({ z: 1 })
      persist.set('key2', { z: 0 })
      expect(persist.get('key2')).to.eql({ z: 0 })
      persist.set('key2', { z: null })
      expect(persist.get('key2')).to.eql({ z: null })
      persist.set('key3', { z: '' })
      expect(persist.get('key3')).to.eql({ z: '' })
    })
  })
})

describe('customize', () => {
  it('with sessionStorage', () => {
    const persist = createPersist(rnd(), { z: 1 }, {
      provider: sessionStorage
    })
    persist.set({ y: 1 })
    expect(persist.get()).to.eql({ y: 1, z: 1 })
  })

  it('serialize/deserialize', () => {
    const value = {}
    const persist = createPersist(rnd(), { z: 1 }, {
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
    persist.set({ z: 0 })
    expect(persist.get()).to.eql({ z: 0 })
    persist.set({ z: null })
    expect(persist.get()).to.eql({ z: null })
  })

  it('with expires', done => {
    const persist = createPersist(rnd(), { z: 1 }, {
      // one second
      expires: 1000
    })
    persist.set({ y: 1 })
    expect(persist.get()).to.eql({ y: 1, z: 1 })
    setTimeout(() => {
      expect(persist.get()).to.eql({ z: 1 })
      done()
    }, 1000)
  })
})
