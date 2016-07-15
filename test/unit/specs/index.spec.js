import createPersist from '../../../src'

describe('getPersist', () => {
  it('init', () => {
    const persist = createPersist('KEY0')
    expect(persist.get()).to.eql({})
  })

  it('with initialState', () => {
    const persist = createPersist('KEY1', { x: 1 })
    expect(persist.get()).to.eql({ x: 1 })
  })
})

describe('setPersist', () => {
  it('with initialState', () => {
    const persist = createPersist('KEY2', { z: 1 })
    persist.set({ y: 1 })
    expect(persist.get()).to.eql({ y: 1, z: 1 })
  })

  it('override initialState', () => {
    const persist = createPersist('KEY3', { z: 1 })
    persist.set({ z: 0 })
    expect(persist.get()).to.eql({ z: 0 })
    persist.set({ z: null })
    expect(persist.get()).to.eql({ z: null })
  })
})

describe('customize', () => {
  it('with sessionStorage', () => {
    const persist = createPersist('KEY4', { z: 1 }, {
      provider: sessionStorage
    })
    persist.set({ y: 1 })
    expect(persist.get()).to.eql({ y: 1, z: 1 })
  })

  it('serialize/deserialize', () => {
    const value = {}
    const persist = createPersist('KEY5', { z: 1 }, {
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
    const persist = createPersist('KEY6', { z: 1 }, {
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
