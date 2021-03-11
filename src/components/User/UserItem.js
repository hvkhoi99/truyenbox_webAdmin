import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    Link,
} from "react-router-dom";
import { actDeleteUserRequest } from '../../actions/users';
import showAlert from '../../utils/showAlert';

class UserItem extends Component {
    deleteClick = (e, id, userDataId) => {
        e.preventDefault();
        if (window.confirm('Bạn có chắc muốn xóa ?')) {
            (id === userDataId) ? showAlert('Bạn không thể tự xóa tài khoản của mình', 'danger') : this.props.deleteUser(id);
        }
    }

    renderTr = (user, userData) => {
        if (userData.role === 'boss' && (user.role === "user" || user.role === "admin" || user.id === userData.id)) {
            return (
                <td>
                    <Link to={`/user/edit/${user.id}`} title="Sửa" className="edit"><i className="fa fa-pencil icon" /></Link>
                    <Link to='/' title="Xóa" className="delete" onClick={(e) => this.deleteClick(e, user.id, userData.id)}><i className="fa fa-trash icon" /></Link>
                </td>
            )
        } else {
            if (userData.role === 'admin' && (user.role === "user" || user.id === userData.id)) {
                return (
                    <td>
                        <Link to={`/user/edit/${user.id}`} title="Sửa" className="edit"><i className="fa fa-pencil icon" /></Link>
                        <Link to='/' title="Xóa" className="delete" onClick={(e) => this.deleteClick(e, user.id, userData.id)}><i className="fa fa-trash icon" /></Link>
                    </td>
                )
            }
            else {
                return (
                    <td>
                    </td>
                )
            }
        }


    }
    render() {
        let { user } = this.props;
        var role = "";
        if(user.role === "user") {
            role = "Thành viên"
        }
        else if(user.role === "admin"){
            role = "Admin"
        }
        else if(user.role === "boss"){
            role = "Quản lý"
        }
        var userData = localStorage.getItem("userData");
        userData = JSON.parse(userData);
        return (
            <tr>
                <td>{this.props.stt}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{role}</td>
                {this.renderTr(user, userData)}
            </tr>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteUser: (id) => {
            dispatch(actDeleteUserRequest(id))
        }
    }
}

export default connect(null, mapDispatchToProps)(UserItem)