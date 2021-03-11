import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actAddCategoryRequest } from '../../actions/category';
import { Link } from 'react-router-dom';
import showAlert from '../../utils/showAlert';
import { showLoading } from '../../utils/helpers';



class AddCategory extends Component {    

    constructor(props) {
        super(props);
        this.nameRef = React.createRef();
        this.descriptionRef = React.createRef();
    }

    addClick = () => {
        if (this.nameRef.current.value === "") {
            showAlert("Không được để trống tên Chuyên mục", "warning");
        }
        else {
            if (window.confirm('Bạn có chắc muốn thêm ?')) {
                showLoading(true);
                var { history } = this.props;
                let newCategory = {
                    name: this.nameRef.current.value,
                    description: this.descriptionRef.current.value
                }
                this.props.addCategory(newCategory);
                setTimeout(() => {
                    history.push("/categories");
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
                    <h2><Link to={``} title="Quay lại" className="edit" onClick={(e) => this.backClick(e)}><i className="fa fa-chevron-left icon-back" /></Link>THÊM MỚI CHUYÊN MỤC</h2>
                    <div className="hr1" />
                    <label htmlFor="name">Tên chuyên mục</label>
                    <input type="text" name="name" id="name" ref={this.nameRef} />

                    <label htmlFor="description">Mô tả ngắn</label>
                    <textarea name="description" id="description" ref={this.descriptionRef} />

                    <button onClick={() => this.addClick()}>Thêm mới</button>
                </div>
            </div>

        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addCategory: (category) => {
            dispatch(actAddCategoryRequest(category))
        }
    }
}
export default connect(null, mapDispatchToProps)(AddCategory)
