import { combineReducers } from "redux"

// import postReducer from "pages/posts/reducer"
// import categoryReducer from "pages/categories/reducer"
import homepageReduer from "./pages/homepages/reducers"

export default combineReducers({
  auth: (state = {}, action) => { return state },
//   posts: postReducer,
//   categories: categoryReducer,
  homepage: homepageReduer
})