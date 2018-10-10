import { Component } from "react"

import { pageWrapper } from "../utils/wrapper"

class ProjectPage extends Component {
    static async getInitialProps(ctx) {
        return {}
    }

    render(){
        return (
            <div>
                This is Project Page
            </div>
        )
    }
}

export default pageWrapper(null)(ProjectPage)