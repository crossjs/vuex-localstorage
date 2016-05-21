import { getPersist, setPersist } from '../../../src'

describe('getPersist/setPersist', () => {
  it('init', () => {
    expect(getPersist('KEY0')).to.eql({})
  })

  it('default', () => {
    setPersist('KEY1', { x: 1 })
    expect(getPersist('KEY1')).to.eql({ x: 1 })
  })

  it('with initialState', () => {
    setPersist('KEY2', { x: 1 })
    expect(getPersist('KEY2', { y: 1 })).to.eql({ x: 1, y: 1 })
  })
})
