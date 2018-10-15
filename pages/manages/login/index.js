import { Component } from "react"
import Link from "next/link"
import Router from "next/router"
import Notification from "../../../components/notifications"
import axios from "axios"

import { Input, Button } from 'antd';
import { pageWrapper } from "../../../utils/wrapper"

class ManageLoginPage extends Component {
    constructor(props) {
        super(props)

        this.state =  {
            email: "",
            password: ""
        }
    }
    handleSubmitLogin = () => {
        axios({
            method: "POST",
            url: "/api/users/login",
            data: {...this.state}
        })
        .then(res => {
            if (res.status === 200 && res.data.success === true ) {
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("user", JSON.stringify(res.data.user))
                Notification.success("login success !")
                Router.replace("/manages")
            } else {
                Notification.errorThen(res, "Something went wrong !")
            }
        })
        .catch(err => {
            Notification.errorCatch(err, "Something went wrong catch !")
        })
    }

    render() {
        const { email, password } = this.state
        
        return (
            <div className="syn-wrapper">
                <div className="syn-form">
                    <h2>Login</h2>
                    <div className="syn-form_login">
                        <label>Email</label>
                        <Input 
                            value={email}
                            onChange= {e => this.setState({ email: e.target.value })}
                            className="syn-form_input"
                        />
                        <label>password</label>
                        <Input 
                            value={password}
                            onChange={e => this.setState({ password: e.target.value })}
                            type="password"
                            className="syn-form_input"
                        />
                        <Button onClick={this.handleSubmitLogin} className="syn-form_input-btn" type="danger">Login</Button>
                        <div>
                            <Link href="/manages/signup"><a>Signup here</a></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default pageWrapper()(ManageLoginPage)