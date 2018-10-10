import { Component } from "react"

import { pageWrapper } from "../utils/wrapper"

class ReferPage extends Component {
    static async getInitialProps(ctx) {
        return {}
    }

    render(){
        return (
            <div>
                This is Refer Page
            </div>
        )
    }
}

export default pageWrapper(null)(ReferPage)