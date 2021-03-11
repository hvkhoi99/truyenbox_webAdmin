import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actEditAuthorRequest, actFetchAuthorsRequest, actGetAuthorRequest } from '../../actions/author';
import { showLoading } from '../../utils/helpers';
import showAlert from '../../utils/showAlert';

class EditAuthor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            description: ""
        }
        this.nameRef = React.createRef();
        this.descriptionRef = React.createRef();
    }

    editClick = (e) => {
        e.preventDefault();
        if (this.nameRef.current.value === "") {
            showAlert("Không được để trống tên tác giả", "warning");
        }
        else {
            if (window.confirm('Bạn có chắc muốn sửa ?')) {
                showLoading(true);
                let { history } = this.props;
                let authorEdit = {
                    id: this.state.id,
                    name: this.nameRef.current.value,
                    description: this.descriptionRef.current.value
                }

                this.props.editAuthor(authorEdit);
                setTimeout(() => {
                    history.push("/authors");
                }, 2000);
            }
        }
    }
    componentDidMount() {
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            this.props.getAuthor(id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.authorEditing) {
            var { authorEditing } = nextProps;
            this.setState({
                id: authorEditing.id,
                name: authorEditing.name,
                description: authorEditing.description,
            });
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
                    <h2><Link to={``} title="Quay lại" className="edit" onClick={(e) => this.backClick(e)}><i className="fa fa-chevron-left icon-back" /></Link>SỬA THÔNG TIN TÁC GIẢ</h2>
                    <div className="hr1" />
                    <form>
                        <label htmlFor="name">Tên tác giả</label>
                        <input ref={this.nameRef} type="text" name="name" id="name" defaultValue={this.state.name} />

                        <label htmlFor="description">Mô tả ngắn</label>
                        <textarea ref={this.descriptionRef} name="description" id="description" defaultValue={this.state.description} />

                        <button onClick={(e) => this.editClick(e)} >Chỉnh sửa</button>
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        authorEditing: state.authorEditing,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchAllAuthors: () => {
            dispatch(actFetchAuthorsRequest())
        },
        getAuthor: (id) => {
            dispatch(actGetAuthorRequest(id))
        },
        editAuthor: (author) => {
            dispatch(actEditAuthorRequest(author))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditAuthor);

// {/* <input ref={(input) => { this.name = input }} type="text" name="name" id="name" defaultValue={this.context.authorEdit.name} /> */ }
// this.name.value
// {/* <textarea  ref={(input) => { this.description = input }} name="description" id="description" defaultValue={this.context.authorEdit.description} /> */ }

// trueRedirect: () => {
//     dispatch({type: "TRUE_REDIRECT"})
// },