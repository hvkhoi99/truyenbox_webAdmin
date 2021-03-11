import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    Link, 
} from "react-router-dom";
import { actDeleteAuthorRequest } from '../../actions/author';
import { showLoading } from '../../utils/helpers';

class AuthorItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authorEdit: {}
        }
    }

    deleteClick = (e, id) => {
        e.preventDefault();
        if (window.confirm('Bạn có chắc muốn xóa ?')) {
            showLoading(true);
            this.props.deleteAuthor(id);
        }
    }
    render() {
        var { author } = this.props;
        return (
            <tr>
                <td>{this.props.stt}</td>
                <td>{author.name}</td>
                <td>
                    <Link to={`/author/${author.id}/edit`} title="Sửa" className="edit"><i className="fa fa-pencil icon" /></Link>
                    <a href='/' title="Xóa" className="delete" onClick={(e, id) => { this.deleteClick(e, author.id) }}><i className="fa fa-trash icon" /></a>
                </td>
            </tr>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteAuthor: (id) => {
            dispatch(actDeleteAuthorRequest(id))
        },
    }
}
export default connect(null, mapDispatchToProps)(AuthorItem);
