import { createStore, applyMiddleware } from "../redux-nut"

// import thunk from "redux-thunk"
// import logger from "redux-logger"
// import promise from "redux-promise"

function countReducer(state = 0, action) {
  switch(action.type) {
    case "ADD":
      return action.payload ? state + action.payload : state + 1
    case "MINUS":
      return action.payload ? state - action.payload : state - 1
    default:
      return state
  }
}

const store = createStore(countReducer, applyMiddleware(logger, promise, thunk))
// const store = createStore(countReducer, applyMiddleware(logger, promise ,thunk))

export default store

function logger({ getState, dispatch }) {
  // next就是增强后的dispatch action则是增强版dispatch的传参
  return (next) => (action) => {
    console.log("------------");

    const prevState = getState()

    console.log("prev state", prevState);

    console.log("action    ", action);

    // 调用增强后的dispatch，更新state的值
    const returnValue = next(action)

    const nextState = getState()

    console.log("next state", nextState);

    console.log("------------");

    return returnValue
  }
}

function thunk({ getState, dispatch }) {
  return (next) => (action) => {
    console.log("************thunk middleware execute");
    if (typeof action !== "function") {
      return next(action)
    }
    return action(dispatch, getState)
  }
}

function promise({ getState, dispatch }) {
  return (next) => (action) => {
    console.log("^^^^^^^^^^^^promise middleware execute");
    if (!(action instanceof Promise)) {
      return next(action)
    }
    action.then((payload) => {
      return dispatch(payload)
    }).catch(err => {
      console.error(err);
    })
  }
}