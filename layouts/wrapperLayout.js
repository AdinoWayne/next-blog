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
                <Tabs
                  onClick = {this.handleClick}
                  selectedKeys={[this.state.current]}
                  mode="horizontal"
                >
                  <TabPane key="1" tab={<span><Icon type="thunderbolt"/><Link prefetch href="/"><a>Home</a></Link></span>}> 
                  </TabPane>
                  <TabPane key="2" tab={<span><Icon type="thunderbolt"/><Link prefetch href="/about"><a>About</a></Link></span>}>
                  </TabPane>
                  <TabPane key="3" tab={<span><Icon type="thunderbolt"/><Link prefetch href="/project"><a>Project</a></Link></span>}>
                  </TabPane>
                  <TabPane key="4" tab={<span><Icon type="thunderbolt"/><Link prefetch href="/refer"><a>Refer</a></Link></span>}>
                  </TabPane>
                </Tabs>
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