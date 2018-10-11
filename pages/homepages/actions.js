import axios from "axios";

export const HOMEPAGE_INIT = "HOMEPAGE::INITIAL_HOMEPAGE_DATA";
export const HOMEPAGE_POSTS = "HOMEPAGE::GET_POSTS";
export const HOMEPAGE_CATEGORY = "HOMEPAGE::GET_CATEGORIES";

export const InitialHomepage = _toClient => {
    return {
        type: HOMEPAGE_INIT,
        payload: _toClient
    }
}

export const getPosts = () => {
    return (dispatch) => {
        axios.get("/api/posts")
        .then(res => {
            if (res.status === 200 && res.data.success === true){
                dispatch({
                    type: HOMEPAGE_POSTS,
                    payload: res.data.docs
                })
            } else {
                dispatch({
                    type: "HOMEPAGE::ERROR_POST",
                    payload: res
                })
            }
        })
        .catch(() => {
            dispatch({
                type: "HOMEPAGE::ERROR_GET_POST",
                payload: null
            })
        })
    }
}
export const getCategory = () => {
    return dispatch => axios.get("/api/categories")
        .then(res => {
            if (res.status === 200 && res.data.success === true){
                dispatch({
                    type: HOMEPAGE_CATEGORY,
                    payload: res.data.docs
                })
            } else {
                dispatch({
                    type: "HOMEPAGE::ERROR_CATE",
                    payload: res
                })
            }
        })
        .catch(() => {
            dispatch({
                type: "HOMEPAGE::ERROR_GET_CATE",
                payload: null
            })
        })
}