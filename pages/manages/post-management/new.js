import { Component } from "react"
import Link from "next/link"
import { Button, Input, Tag } from "antd"

import Notification from "../../../components/notifications"
import { pageWrapper } from "../../../utils/wrapper"
import { sendPost } from "../../../utils/request";

const { TextArea } = Input;
const CheckableTag = Tag.CheckableTag;

const tagsFromServer = ['Movies', 'Books', 'Music', 'Sports'];

class ManageNewPostPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            content: "",
            selectedTags: []
        }
    }
    handleChange(tag, checked) {
        const { selectedTags } = this.state;
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter(t => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        this.setState({ selectedTags: nextSelectedTags });
    }

    handleCreateNewPost = () => {
        sendPost("/api/posts", null, this.state)
        .then(res => console.log(res))
        .then(err => console.log(err))
    }

    render() {
        const { selectedTags } = this.state;
        return (
            <div style={{ maxWidth: 700, margin: "30px auto" }} className="new-form-posts">
            <Link href="/manage/post-management">
              <a><h3>Back</h3></a>
            </Link>
            <h3>Title</h3>
            <Input onChange={e => this.setState({ title: e.target.value })} style={{ width: "100%", height: 32 }} />
    
            <h3>Content</h3>
            <TextArea
              onChange={e => this.setState({ content: e.target.value })}
              style={{ backgroundColor: "#d1d1d1", borderColor: "#d1d1d1", fontSize: 14, width: "100%", minHeight: 300 }}
            /><br />
                  <div>
                    <h6 style={{ marginRight: 8, display: 'inline' }}>Tag:</h6>
                    {tagsFromServer.map(tag => (
                    <CheckableTag
                        key={tag}
                        checked={selectedTags.indexOf(tag) > -1}
                        onChange={checked => this.handleChange(tag, checked)}
                    >
                        {tag}
                    </CheckableTag>
                    ))}
                </div>
            <Button type="danger" onClick={() => this.handleCreateNewPost()}>Submit</Button>
          </div>
        )
    }
}

export default pageWrapper(null)(ManageNewPostPage);