import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actDeleteCategoryRequest } from '../../actions/category';
import { showLoading } from '../../utils/helpers';

class CategoryItem extends Component {


    deleteClick = (e, id) => {
        e.preventDefault();
        if (window.confirm('Bạn có chắc muốn xóa ?')) {
            showLoading(true);
            this.props.deleteCategory(id);
        }
    }

    editClick = (e, id) => {
        e.preventDefault();
        alert(id);
    }

    render() {
        let { cate } = this.props;
        return (
            <tr>
                <td>{this.props.stt}</td>
                <td>{cate.name}</td>
                <td>
                    <Link to={`/category/${cate.id}/edit`} title="Sửa" className="edit"><i className="fa fa-pencil icon" /></Link>
                    <Link to='/' title="Xóa" className="delete" onClick={(e, id) => this.deleteClick(e, cate.id)}><i className="fa fa-trash icon" /></Link>
                </td>
            </tr>
        );
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteCategory: (id) => {
            dispatch(actDeleteCategoryRequest(id))
        }
    }
}

export default connect(null, mapDispatchToProps)(CategoryItem)