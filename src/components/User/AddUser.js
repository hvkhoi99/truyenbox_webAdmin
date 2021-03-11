import Axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import showAlert from '../../utils/showAlert';
import '../Admin/style.css'
import { showLoading } from '../../utils/helpers';
import * as Config from '../../constants/Config';



export default class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "",
            redirect: false,
            errUserName: '',
            errMsgEmail: "",
            errMsgPwd: "",
            errMsgRePwd: "",
            errMsg: "",
        };
        this.nameRef = React.createRef()
        this.emailRef = React.createRef()
        this.passwordRef = React.createRef()
        this.RepasswordRef = React.createRef()
    }

    RegisterClick = () => {
        showLoading(true)
        var name = this.nameRef.current.value;
        var email = this.emailRef.current.value;
        var password = this.passwordRef.current.value;
        var password_confirm = this.RepasswordRef.current.value;
        var { history } = this.props;

        Axios
            .post(`${Config.API_URL}/api/admin/register`, { name, email, password, password_confirm })
            .then((response) => {
                setTimeout(() => {
                    showLoading(false)
                    if (response.data.status === 200) {
                        this.setState({
                            msg: response.data.message,
                            errMsg: "",
                            errUserName: "",
                            errMsgEmail: "",
                            errMsgPwd: "",
                            errMsgRePwd: "",
                        });
                        showAlert('Đăng ký tài khoản admin thành công', 'success');
                        setTimeout(() => {
                            history.push("/users");
                        }, 1000)
                    }
                    else {
                        if (response.data.status === "failed") {
                            this.setState({ msg: response.data.message });
                            if (response.data.success === undefined) {
                                this.setState({
                                    errUserName: response.data.errors.name,
                                    errMsgEmail: response.data.errors.email,
                                    errMsgPwd: response.data.errors.password,
                                    errMsgRePwd: response.data.errors.password_confirm,
                                    msg: "",
                                });
                            }
                            else {
                                this.setState({
                                    errMsg: response.data.message,
                                    errUserName: "",
                                    errMsgEmail: "",
                                    errMsgPwd: "",
                                    errMsgRePwd: "",
                                    msg: "",
                                });
                            }
                        }
                    }
                }, 2000);
            }).catch((error) => {
                console.log(error);
            });;
    }

    componentDidMount() {
        var { history } = this.props;
        var userData = localStorage.getItem("userData");
        userData = JSON.parse(userData);
        if (userData.role !== "boss") {
            history.push("/dashboard");
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
                    <h2><Link to={``} title="Quay lại" className="edit" onClick={(e) => this.backClick(e)}><i className="fa fa-chevron-left icon-back" /></Link>THÊM ADMIN</h2>
                    <div className="hr1" />
                    <label htmlFor="name">Tên thành viên</label>
                    <input onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            this.RegisterClick();
                        }
                    }} type="text" name="name" id="name" ref={this.nameRef} />
                    <span className="text-danger">{this.state.errUserName}</span>

                    <label htmlFor="email">Email</label>
                    <input onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            this.RegisterClick();
                        }
                    }} type="text" name="email" id="email" ref={this.emailRef} />
                    <span className="text-danger">{this.state.errMsgEmail}</span>

                    <label htmlFor="password">Mật khẩu</label>
                    <input onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            this.RegisterClick();
                        }
                    }} type="password" name="password" id="password" ref={this.passwordRef} />
                    <span className="text-danger">{this.state.errMsgPwd}</span>

                    <label htmlFor="password_confirm">Nhập lại mật khẩu</label>
                    <input onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            this.RegisterClick();
                        }
                    }} type="password" name="password_confirm" id="password_confirm" ref={this.RepasswordRef} />
                    <span className="text-danger">{this.state.errMsgRePwd}</span>

                    <button onClick={() => this.RegisterClick()}>Thêm</button>
                    <p className="text-danger">{this.state.errMsg}</p>
                    <span className="text-success">{this.state.msg}</span>
                </div>
            </div>
        )
    }
}
