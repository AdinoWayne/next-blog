import update from "immutability-helper"
import { HOMEPAGE_INIT, HOMEPAGE_POSTS, HOMEPAGE_CATEGORY } from "./actions"
const initState = {
    ui:{
        postList: [],
        categoryList: []
    },
    logic: {}
}

export default (state = initState, action) => {
    switch(action.type) {
        case HOMEPAGE_INIT:
            const { posts, categories } = action.payload
            return update(state, { ui: { postList: { $set: posts}, categoryList: { $set: categories } } })
        case HOMEPAGE_POSTS:
            return update(state, { ui: { postList: { $set: action.payload } } })
        case HOMEPAGE_CATEGORY:
            return update(state, { ui: { categoryList: { $set: categories } } })
        default:
            return state
    }
}