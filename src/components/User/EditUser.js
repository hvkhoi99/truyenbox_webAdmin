import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actEditUserRequest, actGetUserEditRequest } from '../../actions/users';
import showAlert from '../../utils/showAlert';

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.nameRef = React.createRef()
    }

    componentDidMount() {
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            this.props.getUserEdit(id);
        }
    }

    editClick = () => {
        var { history } = this.props;
        if (this.nameRef.current.value === "") {
            showAlert("Tên không được để trống", "warning")
        }
        else {
            let user = {
                id: this.props.userGetting.id,
                name: this.nameRef.current.value,
            }
            if(window.confirm("Bạn có chắc muốn sửa")){
                this.props.editUser(user);
                showAlert("Đã sửa thành công", "success");
                if(history) {
                    setTimeout(() => {
                        history.push('/users');

                    }, 2000)
                }
            }
        }
    }

    backClick = (e) => {
        e.preventDefault();
        var { history } = this.props;
        if (history) {
            history.goBack();
        }
    }

    render() {
        return (
            <div className="content-wrapper">
                <div className="main-content">
                    <h2><Link to={``} title="Quay lại" className="edit" onClick={(e) => this.backClick(e)}><i className="fa fa-chevron-left icon-back" /></Link>CHỈNH SỬA THÔNG TIN THÀNH VIÊN</h2>
                    <div className="hr1" />
                    <label htmlFor="name">Tên thành viên</label>
                    <input type="text" name="name" id="name" ref={this.nameRef} defaultValue={this.props.userGetting.name} />

                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" defaultValue={this.props.userGetting.email} readOnly style={{ cursor: 'not-allowed' }} />

                    <button onClick={(e) => this.editClick(e)}>Chỉnh sửa</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userGetting: state.userGetting
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserEdit: (id) => {
            dispatch(actGetUserEditRequest(id))
        },
        editUser: (user) => {
            dispatch(actEditUserRequest(user))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser)
