import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { actGetAuthorByStoryIdRequest } from '../../actions/author'
import { actFetchChaptersRequest } from '../../actions/chapter'
import { actGetStoryRequest } from '../../actions/story'
import { actFetchStoryCategoriesRequest } from '../../actions/story_categories'
import Categories from './Categories'
import ChapterItem from './ChapterItem'
import Pagination from './Pagination'
import Search from './Search'

class ListChapter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            story: {},
            author: {},
            // categories: []
        }
    }
    componentDidMount() {

        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            this.setState({
                id: id
            })
            this.props.getStory(id);
            // this.props.getAuthorByStoryId(id);
            this.props.fetchStoryCategories(id);
            this.props.fetchChapters(id);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.storyEditing) {
            var { storyEditing } = nextProps;
            // var { categories } = nextProps;
            // var { authorEditing } = nextProps;
            this.setState({
                story: storyEditing,
                // author: authorEditing,
                // categories: categories
            });
        }
    }
    renderNumRecord = () => {
        if (this.props.chapters.length > 0) {
            return (
                <div className="num-record">(Có {this.props.chapters.length} bản ghi)</div>
            )
        }
        else {
            let html = (
                <div className="num-record"></div>
            );
            return (
                <div className="num-record">{html}</div>
            );
        }
    }
    backClick = (e) => {
        e.preventDefault();
        var { history } = this.props;
        if (history) { history.goBack(); }
    }
    render() {
        const listChapter = this.props.chapters.map((item, index) => {
            return (
                <ChapterItem key={index} chapter={item} stt={index + 1} />
            )
        })
        return (
            <div className="content-wrapper">
                <div className="main-list">
                    <h2 className="fl-left"><Link to={``} title="Quay lại" className="edit" onClick={(e) => this.backClick(e)}><i className="fa fa-chevron-left icon-back" /></Link>DANH SÁCH CHƯƠNG</h2>
                    <div className="hr" />
                    <div className="detail-story fl-left">
                        <img src={this.state.story.path_image} className="story-img fl-left" alt=""/>
                        <span><b className="story-name">{this.state.story.name}</b>
                            {/* ( <a href className="story-author">{this.state.author.name}</a>  ) */}
                        </span>
                        <Categories />
                        <Link to={`/edit-category/story/${this.props.match.params.id}`} title="Sửa thể loại" className="edit"><i className="fa fa-pencil icon" /></Link>
                    </div>
                    <Search id={this.state.id} />
                    <div className="list">
                        <table className="content-table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên chương</th>
                                    <th>Số trang</th>
                                    <th>Ngày đăng</th>
                                    <th>Cập nhật</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listChapter}
                            </tbody>
                        </table>
                    </div>
                    <div className="num-record">(Có {this.props.chapters.length} bản ghi)</div>
                    <Pagination />
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        storyEditing: state.storyEditing,
        authorEditing: state.authorEditing,
        chapters: state.chapters,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getStory: (id) => {
            dispatch(actGetStoryRequest(id))
        },
        getAuthorByStoryId: (id) => {
            dispatch(actGetAuthorByStoryIdRequest(id))
        },
        fetchChapters: (story_id) => {
            dispatch(actFetchChaptersRequest(story_id))
        },
        fetchStoryCategories: (id) => {
            dispatch(actFetchStoryCategoriesRequest(id))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListChapter)