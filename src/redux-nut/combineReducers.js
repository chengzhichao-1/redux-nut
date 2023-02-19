export default function combineReducers(reducers) {
  // 返回值应该也是一个reducer (prevState, action) => nextState 并且prevState的默认值是对象{}
  return (state = {}, action) => {
    // 我们需要判断state是否改变，改变了才进行订阅更新
    const nextState = {}
    let hasChanged = false

    for (const key in reducers) {
      const reducer = reducers[key]
      nextState[key] = reducer(state[key], action)
      // 判断新旧对象属性值是否改变
      hasChanged = hasChanged || nextState[key] !== state[key]
    }

    // 判断新旧state对象 属性长度是否一致 {a: 1, b: 1}  {a: 1}
    hasChanged = hasChanged || Object.keys(state).length !== Object.keys(nextState).length

    return hasChanged ? nextState : state
  }
}