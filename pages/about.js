import { Component } from "react"

import { pageWrapper } from "../utils/wrapper"

class AboutPage extends Component {
    static async getInitialProps(ctx) {
        return {}
    }
    static pageInfo = {
        title: "About me - Tran Quang Trung"
    }
    render(){
        return (
            <div>
                This is About Page
            </div>
        )
    }
}

export default pageWrapper(null)(AboutPage)