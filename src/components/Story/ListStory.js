import React, { Component } from 'react';
import Search from './Search'
import { actFetchStoriesRequest } from '../../actions/story';
import { connect } from 'react-redux';
import StoryItem from './StoryItem';
import Pagination from './Pagination';
import { actFetchAuthorsRequest } from '../../actions/author';
import { Link, Redirect } from 'react-router-dom';


class ListStory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            html: "Loading.."
        }
    }

    componentDidMount() {
        this.props.fetchStories();
        this.props.fetchAllAuthors();
    }
    findIndex = (list, id) => {
        var result = -1;
        list.forEach((item, index) => {
            if (item.id === id) {
                result = index;
            }
        })
        return result;
    }
    getNameAuthor = (list, id) => {
        if (list.length > 0) {
            let name = (id === null) ? 'Đang cập nhật' : list[this.findIndex(list, id)].name;
            return name;
        }
        return 'Loading..';
    }
    renderNumRecord = () => {
        if (this.props.stories.length > 0) {
            return (
                <div className="num-record">(Có {this.props.stories.length} bản ghi)</div>
            )
        }
        else {
            setTimeout(() => {
                this.setState({
                    html: "Không tìm thấy"
                });
            }, 15000);

            let html = (
                <div className="num-record">{this.state.html}</div>
            );

            return (
                <div className="num-record">{html}</div>
            );
        }
    }

    backClick = (e) => {
        e.preventDefault();
        var { history } = this.props;
        if(history){
            history.goBack();
        }
    }
    render() {
        if (this.props.isLogin === null) {
            return <Redirect to="/login"  />;
        }
        const listStory = this.props.stories.map((item, index) => {
            return <StoryItem stt={index + 1} story={item} key={index} author_name={this.getNameAuthor(this.props.authors, item.author_id)} />
        })
        return (
            <div className="content-wrapper">
                <div className="main-list">
                    <h2 className="fl-left"><Link to={``} title="Quay lại" className="edit" onClick={(e) => this.backClick(e)}><i className="fa fa-chevron-left icon-back" /></Link>DANH SÁCH TRUYỆN</h2>
                    <div className="hr" />
                    <Search />
                    <div className="list">
                        <table className="content-table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên truyện</th>
                                    <th>Tác giả</th>
                                    <th>Trạng thái</th>
                                    <th>Ngày đăng</th>
                                    <th>Cập nhật</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listStory}
                            </tbody>
                        </table>
                    </div>
                    {/* <div className="num-record">(Có {this.props.stories.length} bản ghi)</div> */}
                    {this.renderNumRecord()}

                    <Pagination />
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        stories: state.stories,
        authors: state.authors,
        isLogin: state.isLogin,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchStories: () => {
            dispatch(actFetchStoriesRequest())
        },
        fetchAllAuthors: () => {
            dispatch(actFetchAuthorsRequest())
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListStory)
