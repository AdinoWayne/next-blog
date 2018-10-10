import { Component } from "react"
import Link from "next/link"
import moment from "moment"

import { pageWrapper } from "../utils/wrapper"
import { InitialHomepage, getPosts, getCategory } from "./homepages/actions"

class Index extends Component {
    static async getInitialProps(argument){
        let _toClient;
        const { store } = argument;
        if (argument.isServer) {
            _toClient = argument.req._toClient;
            store.dispatch(InitialHomepage(_toClient))
        } else {
            store.dispatch(getPosts);
            store.dispatch(getCategory)
        }

        const sendString = "Adino play riven fast Q have pentakill ezly"
        return { isServer: argument.isServer }
    }
    static pageInfo = {
        title: "Adino - tuts"
    }
    renderListOfPost = () => {

    }
    renderListOfCategories = () => {

    }
    renderListOfTags = () => {
        const tags = ["Riven", "Adino", "TopLane", "Javascript"]
    
        return tags.map(elem => {
            return <span key={elem} style={{ padding: "3px 8px", border: "1px solid #666", marginRight: 5 }}>{elem}</span>
        })
    }
      
    render() {
         return (
             <div> hello next </div>
         )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.homepage.ui.postList,
        categories: state.homepage.ui.categoryList
    }
}

export default pageWrapper(mapStateToProps, { })(Index)