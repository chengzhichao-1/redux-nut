function createStore(reducer) {
  let state
  let callbacks = []
  function getState() {
    return state
  }

  function subscribe(callback) {
    let index = callbacks.length
    callback.push(callback)
    return () => {
      callbacks.splice(index, 1)
    }
  }

  function dispatch(action) {
    state = reducer(state, action)
    callbacks.forEach(callback => callback())
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}