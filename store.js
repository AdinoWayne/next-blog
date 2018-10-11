import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import withRedux from "next-redux-wrapper";
import logger from "redux-logger";

import reducers from "./reducers";

const initStore = (initState = {}) => createStore(
    reducers,
    initState,
    compose(
      applyMiddleware(thunk),
      typeof window !== "undefined" && window.devToolsExtension
          ? window.devToolsExtension()
          : f => f
    )
  )
  
export default (mapStateToProps, actions) => {
  return (component) => withRedux(initStore, mapStateToProps, actions)(component)
}
