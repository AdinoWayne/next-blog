import { Component } from "react"
import Link from "next/link"
import Router from "next/router"
import axios from "axios"
import { Input, Button } from 'antd';

import Notification from "../../../components/notifications"
import { pageWrapper } from "../../../utils/wrapper"

class ManageSignupPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            username: "",
            password: ""
        }
    }

    handleSubmitLogin = () => {
        const url = "/api/users/signup"
        const body = Object.assign({}, this.state)
        axios({
            method: "POST",
            url,
            data: body
        })
        .then(res => {
            if(res.status === 201 && res.data.success === true) {
                Notification.success("Signup Success !")
                Router.push("/manages/login")
            } else {
                Notification.errorThen(res, "Something went wrong !")
            }
        })
        .catch(err => {
            Notification.errorThen(err, "Something went wrong catch !")
        })
    }

    render() {
        const { email, username, password } = this.state
    
        return (
          <div className="syn-wrapper">
            <div className="syn-form">
              <h2>Signup</h2>
              <div className="syn-form__login">
                <label>Email</label>
                <Input
                  value={email}
                  onChange={e => this.setState({ email: e.target.value })}
                  className="syn-form__input"
                />
                <label>Username</label>
                <Input
                  value={username}
                  onChange={e => this.setState({ username: e.target.value })}
                  className="syn-form__input"
                />
                <label>password</label>
                <Input
                  value={password}
                  onChange={e => this.setState({ password: e.target.value })}
                  type="password"
                  className="syn-form__input"
                />
                <Button onClick={this.handleSubmitLogin} className="syn-form__input--btn">Signup</Button>
    
                <div>
                  <Link href="/manage/login"><a>Login here</a></Link>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

export default pageWrapper()(ManageSignupPage)