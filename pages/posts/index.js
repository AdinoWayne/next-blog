import { Component } from "react"
import axios from "axios"
import marked from "marked"
import { pageWrapper } from "../../utils/wrapper"

class PostPage extends Component {
    static async getInitialProps(argment){
        let postDocument
        if (argment.isServer) {
          // TODO: need to handle _err
          postDocument = argment.req._post
        } else {
          // TODO: Need refactor this
          const res = await axios.get(`/api/posts/${argment.query.postSlug}`)
          if (res.data.success === true) postDocument = res.data.doc
        }
        return { postDocument }
    }
    render() {
        const postDocument = this.props.postDocument
        return (
          <div className="syn-content" style={{ maxWidth: 600, margin: "30px auto" }}>
            <h2>{ postDocument && postDocument.title }</h2>
    
            <div className="markdown-content">
              { postDocument && <div dangerouslySetInnerHTML={{ __html: marked(postDocument.content) }} /> }
            </div>
          </div>
        )
    }
}

export default pageWrapper(null)(PostPage)