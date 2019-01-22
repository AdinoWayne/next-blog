import { Component } from "react"
import Link from "next/link"
import Router from "next/router"
import { Table, Divider, Tag } from 'antd';
import { pageWrapper } from "../../../utils/wrapper"
import { sendGet } from "../../../utils/request";

const columns = [{
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  }, {
    title: 'Deleted',
    dataIndex: 'isDeleted',
    key: 'isDeleted',
    render: value => (
        value ? "true" : "false"
    )
  }, {
    title: 'Hidden',
    dataIndex: 'isHidden',
    key: 'isHidden',
    render: value => (
        value ? "true" : "false"
    )
  }, {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: () => (
      <span>
        <Tag color="blue" key={1}>Nothing</Tag>
      </span>
    ),
  }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:void(0);">Edit</a>
        <Divider type="vertical" />
        <a href="javascript:void(0);">Delete</a>
      </span>
    ),
}];


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

    render() {
        console.log(this.state.posts)
        return (
            <div style={{ maxWidth: 700, margin: "30px auto" }}>
                <Link href="/manages">
                <a><h3>Back</h3></a>
                </Link>
        
                <Link href="/manages/post-management/new">
                <a><h3>Create new post</h3></a>
                </Link>
                <Table columns={columns} dataSource={this.state.posts}></Table>
          </div>
        )
    }
}

export default pageWrapper(null)(ManagePostPage)