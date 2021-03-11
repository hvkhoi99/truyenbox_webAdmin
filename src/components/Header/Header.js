import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    Link,
} from "react-router-dom";
import { isLoginFalse } from '../../actions/login';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userCurrent: {}
        }
    }

    click = (e) => {
        e.preventDefault();
    }

    logoutClick = (e) => {
        localStorage.clear();
        this.props.setLoginFalse();
        this.setState({
            isLogin: null
        })
    }
    componentDidMount() {
        this.setState({
            userCurrent: this.props.userCurrent
        })
    }

    render() {
        var userData = localStorage.getItem("userData");
        var user = JSON.parse(userData);
        var email = (user !== null) ? user.email.split('@')[0] : 'Admin';
        
        var header = (this.props.isLogin) ? (
            <header className="main-header">
                <Link to="/dashboard" className="logo"> <span className="logo-lg">ADMIN</span> </Link>
                <nav className="navbar navbar-static-top" role="navigation">
                    <Link to="http://www.google.com" className="sidebar-toggle" data-toggle="offcanvas" role="button" />
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            <li className="dropdown user user-menu"> <Link onClick={(e) => this.click(e)} to="http://www.google.com" className="dropdown-toggle" data-toggle="dropdown">
                                <img src="dist\img\ava.jpg" className="user-image" alt=""/> <span className="hidden-xs">{email}</span> </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="dropdown-menu">
                        <ul>
                            <li className="user-footer">
                                <Link to="/admin/edit">Thông tin cá nhân</Link>
                            </li>
                            <li className="user-footer">
                                <Link to="/" onClick={(e) => this.logoutClick(e)}>Thoát</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        ) : (null)
        return (
            <>
                {header}
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userCurrent: state.userCurrent,
        isLogin: state.isLogin,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoginFalse: (isLogin) => {
            dispatch(isLoginFalse(isLogin))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)