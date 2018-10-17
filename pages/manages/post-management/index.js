import { Component } from "react"
import Link from "next/link"
import Router from "next/router"

import Notification from "../../../components/notifications"
import { pageWrapper } from "../../../utils/wrapper"
import { sendGet } from "../../../utils/request";

class ManagePostPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: "",
            content: "",
            posts: []
        }
    }
    componentDidMount() {
        sendGet("/api/posts")
        .then(res => {
            if (res.status === 200 && res.data.success === true) {
                this.setState({ posts: res.data.docs})
            }
        })
        .catch(err => {
            console.log("Error in componentDidMount ManagePostPage")
            console.log(err)
        })
    }

    renderPosts() {
        const posts = this.state.posts
        if (!Array.isArray(posts) || posts.length === 0) {
            return (<h2>HAVEN'T ANY POSTS</h2>)
        }
        return posts.map((elem, index) => {
            return (
                <li key={index} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>{elem.title}</span>
                    <span><a href="#">Edit</a></span>
                </li>
            )
        })
    }

    render() {
        return (
            <div style={{ maxWidth: 700, margin: "30px auto" }}>
                <Link href="/manages">
                <a><h3>Back</h3></a>
                </Link>
        
                <Link href="/manages/post-management/new">
                <a><h3>Create new post</h3></a>
                </Link>
    
                <ul>
                {this.renderPosts()}
                </ul>
          </div>
        )
    }
}

export default pageWrapper(null)(ManagePostPage)