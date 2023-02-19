import { compose } from "./index"

export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer)
    let { dispatch } = store

    // 这里比较疑惑，两种dispatch的写法我觉得效果没啥区别
    const midAPI = {
      getState: store.getState,
      // dispatch: (action, ...args) => dispatch(action, ...args)
      dispatch
    }

    // 参考每个中间键的传参 就是这个midAPI { getState, dispatch }
    const middlewareChain = middlewares.map((middleware) => middleware(midAPI))

    // 新版的dispatch要用到聚合函数，前一个函数的返回值是后一个函数的传参，达到增强dispatch函数的目的
    dispatch = compose(...middlewareChain)(dispatch)

    return {
      ...store,
      dispatch
    }
  }
}