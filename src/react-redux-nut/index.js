import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useReducer,
  useState,
} from "react";

const Context = React.createContext();

export function Provider({ store, children }) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

function getProps(store, mapStateToProps, mapDispatchToProps) {
  const newState = mapStateToProps ? mapStateToProps(store.getState()) : store;
  let newDispatch;
  if (typeof mapDispatchToProps === "function") {
    newDispatch = mapDispatchToProps(store.dispatch);
  } else {
    newDispatch = {};
    for (const key in mapDispatchToProps) {
      const action = mapDispatchToProps[key];
      newDispatch[key] = (...args) => store.dispatch(action(...args));
    }
  }

  return { ...newState, ...newDispatch };
}

export const connect =
  (mapStateToProps, mapDispatchToProps) => (WrapperComponent) => (props) => {
    const store = useContext(Context);
    const { getState, dispatch, subscribe } = store;

    const stateProps = mapStateToProps
      ? mapStateToProps(getState())
      : getState();
    let dispatchProps = { dispatch };

    if (typeof mapDispatchToProps === "function") {
      dispatchProps = mapDispatchToProps(dispatch);
    } else {
      dispatchProps = {}
      for (const key in mapDispatchToProps) {
        const action = mapDispatchToProps[key];
        dispatchProps[key] = (...args) => dispatch(action(...args));
      }
    }

    // const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const forceUpdate = useForceUpdate()

    useLayoutEffect(() => {
      const unSubscribe = subscribe(() => forceUpdate());

      return () => {
        unSubscribe();
      };
    }, [subscribe]);

    return <WrapperComponent {...props} {...stateProps} {...dispatchProps} />;
  };

function useForceUpdate() {
  const [state, setState] = useState(0);
  // useCallback防止把这个update函数传给组件造成频繁更新 进行缓存
  const update = useCallback(() => {
    setState((prev) => prev + 1);
  }, []);

  return update;
}
