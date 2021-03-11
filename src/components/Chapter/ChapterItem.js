import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actDeleteChapterRequest } from '../../actions/chapter';
import { showLoading } from '../../utils/helpers';

var moment = require('moment');

class ChapterItem extends Component {
    deleteClick = (e, id) => {
        e.preventDefault();
        if(window.confirm('Bạn có chắc muốn xóa ?')){
            showLoading(true);
            this.props.deleteChapter(id);
        }

    }
    render() {
        var { chapter } = this.props;
        return (
            <tr>
                <td>{this.props.stt}</td>
                <td><Link to={`/chapter/${chapter.id}/detail`}>{chapter.name}</Link></td>
                <td>{chapter.pages}</td>
                <td>{moment(chapter.created_at).format("L")}</td>
                <td>{moment(chapter.updated_at).format("L")}</td>
                <>
                    <Link to={`/chapter/edit/${chapter.id}`} title="Sửa" className="edit"><i className="fa fa-pencil icon" /></Link>
                    <Link to={`/chapter/delete/${chapter.id}`} title="Xóa" className="delete" onClick={(e, id) => this.deleteClick(e, chapter.id)}><i className="fa fa-trash icon" /></Link>
                </>
            </tr>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteChapter: (id) => {
            dispatch(actDeleteChapterRequest(id))
        }
    }
}
export default connect(null, mapDispatchToProps)(ChapterItem)