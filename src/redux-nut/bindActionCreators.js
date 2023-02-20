export function bindActionCreators(actionCreators, dispatch) {
  const creators = {}
  for (const key in actionCreators) {
    const creator = actionCreators[key]
    creators[key] = (...args) => dispatch(creator(...args))
  }
  return creators
}