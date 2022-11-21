export default function createStore(reducer) {
  let state
  let callbacks = []
  function getState() {
    return state
  }

  function subscribe(callback) {
    callbacks.push(callback)
    return () => {
      const index = callbacks.indexOf(callback)
      if (index !== -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  function dispatch(action) {
    state = reducer(state, action)
    callbacks.forEach(callback => callback())
  }

  dispatch({ type: Symbol("init") });

  return {
    getState,
    subscribe,
    dispatch
  }
}