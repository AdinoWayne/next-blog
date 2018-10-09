import { Component } from "react"
import Head from "next/head"
import vi from "antd/lib/locale-provider/en_US"
import { LocaleProvider } from "antd"
import Router from "next/router"
import nprogress from 'nprogress'
import Wrapper from "./wrapperLayout"

import { getUserFromRequest, isInManagementPage } from "../utils/tools"

nprogress.configure({ showSpinner: false, easing: 'ease', speed: 800 });

const bigLayout = OurChildComponent => {
    class HigherOrderComponent extends Component {
        static async getInitialProps(argument){
            let isAuthServer = false, isInAdminPage = false, verifiedUser
            if (isInManagementPage(ctx)) {
                isInAdminPage = true
                let user = getUserFromRequest(ctx.req)
                if (user) {
                  isAuthServer = true
                  verifiedUser = user
                }
                if (!user && !ctx.isServer) Router.replace("/manage/login")
              }
        
              const childProps = OurChildComponent.getInitialProps ? await OurChildComponent.getInitialProps(ctx) : {}
        
              return { ...childProps, isAuthServer, isInAdminPage, verifiedUser }
        }
        render() {
            return(
                <div>
                    <Wrapper>
                        <OurChildComponent { ...this.props } />
                    </Wrapper>
                </div>
            )
        }
    }
}
export default bigLayout