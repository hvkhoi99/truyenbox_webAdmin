import Axios from 'axios';
import React, { Component } from 'react'
import './style.css';
import * as Config from '../../constants/Config';
import { showLoading } from '../../utils/helpers';


export default class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msgPassCurrent: "",
            msgPass: "",
            msgPassConfirm: "",
            msgErr: "",
            msgSuccess: "",
            password_current: "",
            password: "",
            password_confirm: "",
        }
        this.password_currentRef = React.createRef()
        this.passwordRef = React.createRef()
        this.password_confirmRef = React.createRef()
    }


    saveClick = (e) => {
        showLoading(true);
        e.preventDefault();
        var { match } = this.props;
        var password_current = this.password_currentRef.current.value;
        var password = this.passwordRef.current.value;
        var password_confirm = this.password_confirmRef.current.value;
        var email = match.params.email;

        if (email !== null) {
            Axios.post(`${Config.API_URL}/api/change-password/` + email, {
                    password_current,
                    password,
                    password_confirm
                }).then((response) => {
                    showLoading(false);
                    if (response.data.status === 200) {
                        this.setState({
                            msgPassCurrent: "",
                            msgPass: "",
                            msgPassConfirm: "",
                            msgErr: "",
                            msgSuccess: response.data.message,
                        });

                    }
                    else {
                        if (response.data.status === "failed") {
                            if (response.data.success === undefined) {
                                this.setState({
                                    msgPassCurrent: response.data.errors.password_current,
                                    msgPass: response.data.errors.password,
                                    msgPassConfirm: response.data.errors.password_confirm,
                                    msgErr: "",
                                    msgSuccess: "",
                                });
                            }
                            else {
                                this.setState({
                                    msgPassCurrent: "",
                                    msgPass: "",
                                    msgPassConfirm: "",
                                    msgErr: response.data.message,
                                    msgSuccess: "",
                                });
                            }
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                });
            e.target.reset();
        }

    }


    render() {
        return (
            <div className="content-wrapper">
                <div className="info">
                    <div className="info-title">
                        <b>?????i m???t kh???u</b>
                    </div>
                    <form onSubmit={(e) => this.saveClick(e)}>
                        <div className="form-change-password">
                            <label htmlFor="current-password">M???t kh???u hi???n t???i</label>
                            <input type="password" ref={this.password_currentRef} name="current-password" id="current-password" defaultValue={this.state.password_current} />
                            <span className="text-danger">{this.state.msgPassCurrent}</span>

                            <label htmlFor="new-password">M???t kh???u m???i</label>
                            <input type="password" ref={this.passwordRef} name="new-password" id="new-password" />
                            <span className="text-danger">{this.state.msgPass}</span>

                            <label htmlFor="re-new-password">Nh???p l???i m???t kh???u m???i</label>
                            <input type="password" ref={this.password_confirmRef} name="re-new-password" id="re-new-password" />
                            <span className="text-danger">{this.state.msgPassConfirm}</span>

                            <span className="text-danger">{this.state.msgErr}</span>
                            <span className="text-success">{this.state.msgSuccess}</span>

                            <button type="submit" className="save-change">L??u m???t kh???u</button>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}
