import { Component } from "react"
import { connect } from "react-redux"
import Router from "next/router"
import Link from "next/link"

import { Layout } from 'antd'
import { Menu, Icon, Tabs } from 'antd';
const { Header, Footer, Content} = Layout
const TabPane = Tabs.TabPane;
class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "1"
    }
  }
  handleClick = (elem) => {
    this.setState({ current: elem.key })
  }
  render() {
    return (
      <div className="syn-layout">
        <Header className="syn-header">
          <div className="syn-header__wrapper">
            <div className="syn-header__navbar">
              <div className="syn-logo">
              <Link prefetch href="/"><a style={{ fontSize: 28, fontWeight: 600 }}>Adino Home</a></Link>
              </div>
              <nav className="nav-menu">
                <Menu
                  onClick = {this.handleClick}
                  mode="horizontal"
                >
                  <Menu.Item key="1">
                      <Link prefetch href="/"><a>Home</a></Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                      <Link prefetch href="/about"><a>About</a></Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                      <Link prefetch href="/project"><a>Project</a></Link>
                  </Menu.Item>
                  <Menu.Item key="4">
                      <Link prefetch href="/manages/login"><a>Login</a></Link>
                  </Menu.Item>
                </Menu>
              </nav>
            </div>
          </div>
        </Header>
        <Content>
            <div className="syn-layout__content">
              {this.props.children}
            </div>
        </Content>
        <Footer className="syn-footer">
          <div className="syn-footer__wrapper">
            <span>
              Copyright © 2018 Adino
            </span>
          </div>
        </Footer>
      </div>
    )
  }
}

export default connect(null, null)(Wrapper)