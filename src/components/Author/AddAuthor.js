import React, { Component } from 'react'
import { connect } from 'react-redux';
import { actAddAuthorRequest } from '../../actions/author';
import showAlert from '../../utils/showAlert';
import { Link } from 'react-router-dom';
import { showLoading } from '../../utils/helpers';


class AddAuthor extends Component {
    constructor(props) {
        super(props);
        this.nameRef = React.createRef();
        this.descriptionRef = React.createRef();
    }

    addClick = () => {
        if (this.nameRef.current.value === "") {
            showAlert("Không được để trống tên tác giả", "warning")
        }
        else {
            if (window.confirm('Bạn có chắc muốn thêm ?')) {
                showLoading(true);
                var { history } = this.props;
                let newAuthor = {
                    name: this.nameRef.current.value,
                    description: this.descriptionRef.current.value
                }
                this.props.addAuthor(newAuthor);
                setTimeout(() => {
                    history.push("/authors");
                }, 2000);
            }
        }
    }
    backClick = (e) => {
        e.preventDefault();
        var { history } = this.props;
        history.goBack();
    }
    render() {
        return (
            <div className="content-wrapper">
                <div className="main-content">
                    <h2><Link to={``} title="Quay lại" className="edit" onClick={(e) => this.backClick(e)}><i className="fa fa-chevron-left icon-back" /></Link>THÊM MỚI TÁC GIẢ</h2>
                    <div className="hr1" />
                    <label htmlFor="name">Tên tác giả</label>
                    <input ref={this.nameRef} type="text" name="name" id="name" />

                    <label htmlFor="description">Mô tả ngắn</label>
                    <textarea ref={this.descriptionRef} name="description" id="description" />

                    <button onClick={() => this.addClick()} value="Thêm mới">Thêm mới</button>
                </div>
            </div>

        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addAuthor: (author) => {
            dispatch(actAddAuthorRequest(author))
        }
    }
}
export default connect(null, mapDispatchToProps)(AddAuthor)