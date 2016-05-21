export function getPersist (key, initialState = {}) {
  let state = {}

  try {
    state = JSON.parse(localStorage.getItem(key))
  } catch (e) {
    // console.log(e)
  }

  return Object.assign({}, initialState, state)
}

export function setPersist (key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val))
  } catch (e) {
    // console.log(e)
  }
}
