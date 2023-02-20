import { Component } from "react";
import { connect } from "../react-redux-nut";
import { bindActionCreators } from "../redux-nut";

// HOC higher order component 高阶组件：是个函数，接收组件作为参数，返回组件
// 把状态值state或者dispatch通过connect传递
export default connect(
  // mapStateToProps
  ({ count }) => {
    return { count };
  },
  // ({count}, ownProps) => {
  //   // console.log(ownProps);
  //   return {count}
  // }

  // mapDispatchToProps
  // {
  //   add: () => ({ type: "ADD" }),
  // },
  (dispatch) => {
    let creators = {
      add: () => ({type: "ADD"}),
      minus: () => ({type: "MINUS"}),
    }
    // 自动调用dispatch
    creators = bindActionCreators(creators, dispatch)
    return { dispatch, ...creators}
  }
)(
  class ReactReduxPage extends Component {
    render() {
      console.log("props", this.props);
      const {
        count,
        dispatch,
        add,
        minus
      } = this.props;
      return (
        <div>
          <h3>ReactReduxPage</h3>
          <button onClick={() => dispatch({type: "ADD"})}>dispatch{count}</button>
          <button onClick={() => add()}>add{count}</button>
          <button onClick={() => minus()}>minus{count}</button>
        </div>
      );
    }
  }
);
