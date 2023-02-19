export default function createStore(reducer, enhancer) {
  if (enhancer) {
    // enhancer用来增强dispatch函数，怎么增强呢，在createStore中增强dispatch
    // enhancer(createStore)(reducer) 柯里化
    return enhancer(createStore)(reducer)
  }
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