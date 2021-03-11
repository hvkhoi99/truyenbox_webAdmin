import React, { Component } from 'react'
import { connect } from 'react-redux';
import { actEditUserRequest, actGetUserRequest } from '../../actions/users'
import showAlert from '../../utils/showAlert';

class UserCurrent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputStatus: false,
            changeStatus: false,
            name: ''
            
        }
        this.nameRef = React.createRef()
    }
    editClick = () => {
        this.setState({
            inputStatus: !this.state.inputStatus
        })
    }

    changeName = (e) => {
        this.setState({
            changeStatus: true
        })
    }

    saveClick = () => {
        if (!this.state.changeStatus) {
            showAlert("Không sửa thông tin nào", "success")
            this.setState({
                inputStatus: !this.state.inputStatus,
                changeStatus: false
            })
        }
        else {
            if (this.nameRef.current.value === "") {
                showAlert("Tên không được để trống", "warning")
            }
            else {
                let user = {
                    id: this.props.userCurrent.id,
                    name: this.nameRef.current.value,
                    email: this.props.userCurrent.email,
                    role: this.props.userCurrent.role
                }
                this.props.editUser(user);
                localStorage.setItem("userData", JSON.stringify(user));
                showAlert("Đã sửa tên thành công", "success")
                this.setState({
                    inputStatus: !this.state.inputStatus,
                    changeStatus: false,
                    name: this.nameRef.current.value,
                })
            }
        }
    }
    componentDidMount() {
        if (this.props.userCurrent !== null) {
            this.props.getUser(this.props.userCurrent.id);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.userCurrent) {
            var { userCurrent } = nextProps;
            this.setState({
                name: userCurrent.name
            })
        }
    }

    renderName = () => {
        if (!this.state.inputStatus) {
            return (
                <>
                    <li className="tt">{this.state.name}</li>
                    <li className="edit" onClick={() => this.editClick()}><i className="fa fa-pencil" /> <span>Chỉnh sửa</span></li>
                </>
            )
        }
        else {
            return (
                <>
                    <li className="tt"><input onChange={() => this.changeName()} className='edit-name' type='text' defaultValue={this.state.name} ref={this.nameRef} /></li>
                    <li className="edit" >
                        <span className="mr" onClick={() => this.saveClick()}>
                            <i className="fa fa-check" style={{ color: "green" }} /> <span>Lưu</span>
                        </span>
                        <span className="mr" onClick={() => this.editClick()}>
                            <i className="fa fa-close" style={{ color: "red" }} /> <span>Hủy</span>
                        </span>
                    </li>

                </>
            )
        }
    }

    render() {
        console.log(this.props.userCurrent)
        var email = (this.props.userCurrent) ? this.props.userCurrent.email.split('@')[0] : 'Admin'
        return (
            <div className="content-wrapper">
                <div className="info">
                    <div className="info-title">
                        <b>Thông tin tài khoản</b>
                    </div>
                    <div className="_1info">
                        <ul>
                            <li className="td">Tên</li>
                            {this.renderName()}
                        </ul>
                    </div>
                    <div className="_1info">
                        <ul>
                            <li className="td">Email</li>
                            <li className="tt">{email}</li>
                            <li className="edit hidden" ><i className="fa fa-pencil" /> <span>Chỉnh sửa</span></li>
                        </ul>
                    </div>
                    <div className="_1info">
                        <ul>
                            <li className="td">Số điện thoại</li>
                            <li className="tt">09358324754</li>
                            <li className="edit"><i className="fa fa-pencil" /> <span>Chỉnh sửa</span></li>
                        </ul>
                    </div>
                </div>
            </div>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        userCurrent: state.userCurrent
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editUser: (user) => {
            dispatch(actEditUserRequest(user))
        },
        getUser: (id) => {
            dispatch(actGetUserRequest(id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCurrent)