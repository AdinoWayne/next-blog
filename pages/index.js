import { Component } from "react"
import Link from "next/link"
import moment from "moment"
import { Tag } from "antd"
import { pageWrapper } from "../utils/wrapper"
import { InitialHomepage, getPosts, getCategory } from "./homepages/actions"

class Index extends Component {
    static async getInitialProps(argument){
        let _toClient;
        if (argument.isServer) {
            _toClient = argument.req._toClient;
            argument.store.dispatch(InitialHomepage(_toClient))
        } else {
            argument.store.dispatch(getPosts);
            argument.store.dispatch(getCategory);
        }

        return { isServer: argument.isServer }
    }
    static pageInfo = {
        title: "Adino - tuts"
    }
    renderListOfPost = () => {
        if(this.props.posts){
            return this.props.posts.map(elem => {
                return (
                    <li key={elem._id} className="syn-content__list-item">
                    <span> {moment(elem.createdAt).locale('en').format('DD MMM YYYY')} > </span>
                        <Link href={`/posts?postSlug=${elem.slug}`} as={`/posts/${elem.slug}`}>
                        <a style={{ color: "", textDecoration: "none" }}>{elem.title}</a>
                        </Link>
                    </li>
                )
            })
        }
        return null;
    }
    renderListOfCategories = () => {
        if(this.props.categories){
            return this.props.categories.map((elem) => {
                return (
                  <li key={elem._id} style={{ listStyle: "none" }}>
                    {elem.name} <span style={{ color: "#666" }}>({elem.posts.length})</span>
                  </li>
                )
              })
        }
        return null;
    }
    renderListOfTags = () => {
        const tags = ["Riven", "Adino", "TopLane", "Javascript"]
        const color = ["magenta", "volcano", "cyan", "blue", "red", "green", "purple"]
        return tags.map((elem, index) => <Tag color={color[index]} key={elem}>{elem}</Tag>)
    }
      
    render() {
         return (
             <div> 
                 <div className="syn-content">
                    <div className="bio">
                    <p style={{ hyphens: "auto" }}>
                        Anh yêu em..khi môi hồng chưa tập đánh
                        yêu cả chiều hoa tím mộng mơ.. sao giờ em vội đập cánh.
                        chỉ muốn bước đi thật xa
                        sao lại về con phố quanh
                        em ơi giờ tháng mấy??? liệu có còn thương nhớ anh???
                    </p>
                    <p>
                        Find me
                        on <a href="//facebook.com/quangtrung20" target="_blank"><i className="fa fa-facebook"></i></a>
                        , <a href="//github.com/AdinoWayne" target="_blank"><i className="fa fa-github"></i></a>
                    </p>
                    </div>
                    <h2>New Posts</h2>
                    <div className="syn-content__posts">
                    <ul className="syn-content__list">
                        {this.renderListOfPost()}
                    </ul>
                    </div>

                    <h2>Categories</h2>
                    <div className="syn-content__categories">
                    <ul className="syn-content__list">
                        <li className="syn-content__list-item" key="all">All <span>(0)</span></li>
                        {this.renderListOfCategories()}
                    </ul>
                    </div>

                    <h2>Tags</h2>
                    <div className="syn-content__tags" style={{ display: "flex"}}>
                    {this.renderListOfTags()}
                    </div>
                </div>
             </div>
         )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.homepage.ui.postList,
        categories: state.homepage.ui.categoryList
    }
}

export default pageWrapper(mapStateToProps, { })(Index)