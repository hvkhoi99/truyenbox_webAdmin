import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actFetchAuthorsRequest } from '../../actions/author';
import { actEditStoryRequest, actGetStoryRequest, actFetchStoriesRequest } from '../../actions/story';
import { showLoading } from '../../utils/helpers';
import showAlert from '../../utils/showAlert';


class EditStory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            author_id: '',
            status: '',
            description: '',
            path_image: '',
        }
        this.nameRef = React.createRef();
        this.author_idRef = React.createRef();
        this.statusRef = React.createRef();
        this.descriptionRef = React.createRef();
    }

    componentDidMount() {
        this.props.fetchAllAuthors();
        let { match } = this.props;
        if (match) {
            var id = match.params.id;
            this.props.getStory(id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.storyEditing) {
            var { storyEditing } = nextProps;
            this.setState({
                id: storyEditing.id,
                name: storyEditing.name,
                author_id: storyEditing.author_id,
                status: storyEditing.status,
                description: storyEditing.description,
                path_image: storyEditing.path_image,
            });
        }
    }

    renderAuthors = () => {
        if (this.props.authors.length > 0) {
            return this.props.authors.map((item, index) => {
                if (item.id === this.state.author_id) {
                    return (
                        <option value={item.id} key={index} selected>{item.name}</option>
                    )
                }

                else {
                    return (
                        <option value={item.id} key={index}>{item.name}</option>
                    )
                }
            })
        }
    }

    renderStatus = () => {
        if (this.state.status === 'updating') {
            return (
                <select ref={this.statusRef} name="status" id="status">
                    <option value="updating" selected>Đang cập nhật</option>
                    <option value="completed">Hoàn thành</option>
                </select>
            )
        }
        else {
            return (
                <select ref={this.statusRef} name="status" id="status">
                    <option value="updating">Đang cập nhật</option>
                    <option value="completed" selected>Hoàn thành</option>
                </select>
            )
        }
    }

    editClick = (e) => {
        e.preventDefault();
        if (this.nameRef.current.value === "") {
            showAlert("Không được để trống tên truyện", "warning");
        }
        else {
            if (window.confirm('Bạn có chắc muốn sửa ?')) {
                showLoading(true);
                let { history } = this.props;
                let story = {
                    id: this.state.id,
                    name: this.nameRef.current.value,
                    author_id: this.author_idRef.current.value,
                    status: this.statusRef.current.value,
                    description: this.descriptionRef.current.value,
                    path_image: this.state.path_image,
                }
                this.props.editStory(story);

                setTimeout(() => {
                    history.goBack();
                    // this.props.fetchStories();
                }, 2000);
            }
        }
    }

    uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await this.convertBase64(file);
        console.log(base64);
        this.setState({
            path_image: base64
        })
    };

    convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            if (file && file.type.match('image.*')) {
                fileReader.readAsDataURL(file);
            }

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };

        });
    };
    backClick = (e) => {
        e.preventDefault();
        var { history } = this.props;
        if (history) { history.goBack(); }
    }
    render() {
        return (
            <div className="content-wrapper">
                <div className="main-content">
                    <h2><Link to={``} title="Quay lại" className="edit" onClick={(e) => this.backClick(e)}><i className="fa fa-chevron-left icon-back" /></Link>SỬA THÔNG TIN TRUYỆN</h2>
                    <div className="hr1" />

                    <label htmlFor="name">Tên truyện</label>
                    <input ref={this.nameRef} type="text" name="name" id="name" defaultValue={this.state.name} />

                    <label htmlFor="author">Tác giả</label>
                    <select ref={this.author_idRef} name="author" id="author">
                        {this.renderAuthors()}
                    </select>

                    <label htmlFor="category">Tình trạng</label>
                    {this.renderStatus()}

                    <label htmlFor="description">Mô tả ngắn</label>
                    <textarea ref={this.descriptionRef} name="description" id="description" defaultValue={this.state.description} />

                    <div>
                        <label htmlFor="file">Ảnh đại diện</label>
                        <img className="avatar" src={(this.state.path_image === "") ? "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTYCD0gAC06agTM-YuJIA7oQ2i40I60ieaMrA&usqp=CAU" : this.state.path_image} alt=""/>
                        <br />
                        <input type="file" name="file" id="file" onChange={(e) => { this.uploadImage(e) }} />
                    </div>

                    <button onClick={(e) => this.editClick(e)} >Chỉnh sửa</button>
                </div>
            </div>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        storyEditing: state.storyEditing,
        authors: state.authors,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllAuthors: () => {
            dispatch(actFetchAuthorsRequest())
        },
        
        getStory: (id) => {
            dispatch(actGetStoryRequest(id))
        },
        editStory: (story) => {
            dispatch(actEditStoryRequest(story))
        },
        fetchStories: () => {
            dispatch(actFetchStoriesRequest())
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditStory)

