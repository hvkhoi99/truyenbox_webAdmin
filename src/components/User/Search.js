import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actFetchUsersRequest, actSearchhUsersRequest } from '../../actions/users';

class Search extends Component {
    constructor(props) {
        super(props);
        this.nameRef = React.createRef();
    }

    searchClick = () => {
        let name = this.nameRef.current.value;
        (name === "") ? this.props.fetchUsers() : this.props.searchUsers(name);
    }

    isChage = () => {
        let name = this.nameRef.current.value;
        (name === "") ? this.props.fetchUsers() : this.props.searchUsers(name);
    }

    render() {
        var userData = localStorage.getItem("userData");
        var user = JSON.parse(userData);
        return (
            <div className="form-search fl-right">
                {(user.role === 'boss') ?
                    (<Link to="/add/admin" id="add-category" className="fl-left">Thêm Admin</Link>) : ''
                }
                <input type="submit" onClick={() => this.searchClick()} value="Tìm kiếm" />
                <input type="text" ref={this.nameRef} onChange={() => this.isChage()} placeholder={'Nhập tên...'} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userCurrent: state.userCurrent
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: (users) => {
            dispatch(actFetchUsersRequest(users))
        },
        searchUsers: (users) => {
            dispatch(actSearchhUsersRequest(users))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search)