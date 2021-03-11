import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actDeleteStoryRequest } from '../../actions/story';
import { showLoading } from '../../utils/helpers';
var moment = require('moment')
class StoryItem extends Component {

    deleteClick = (e, id) => {
        e.preventDefault();
        if (window.confirm('Bạn có chắc muốn xóa ?')) {
            showLoading(true);
            this.props.deleteStory(id);
        }
    }
   

    render() {
        // var array = [1, 4, 2, 3, 1, 4, 2, 5, 4, 5, 1, 3, 2, 4 , 1];
        // $posts = Post::find([2,3]) // truyen vao mang id
        // var arrFilter = array.filter((item, index) => array.indexOf(item) === index);
        // console.log(arrFilter);
        let { story } = this.props;
        var status = (story.status === 'updating') ? 'Đang cập nhật' : 'Hoàn thành'
        return (
            <tr>
                <td>{this.props.stt}</td>
                <td><Link to={`story/${story.id}`}>{story.name}</Link></td>
                <td>{this.props.author_name}</td>
                <td>{status}</td>
                <td>{moment(story.created_at).format("L")}</td>
                <td>{moment(story.updated_at).format("L")}</td>
                <td>
                    <Link to={`story/${story.id}`} title="Xem chi tiết" className="edit"><i className="fa fa-file icon" /></Link>
                    <Link to={`story/${story.id}/edit`} title="Sửa" className="edit"><i className="fa fa-pencil icon" /></Link>
                    <Link to='/' title="Xóa" className="delete" onClick={(e, id) => this.deleteClick(e, story.id)}><i className="fa fa-trash icon" /></Link>
                </td>
            </tr>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        authors: state.authors
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteStory: (id) => {
            dispatch(actDeleteStoryRequest(id))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(StoryItem)