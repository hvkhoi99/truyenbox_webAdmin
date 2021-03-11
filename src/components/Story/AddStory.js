import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actFetchAuthorsRequest } from '../../actions/author';
import { actFetchCategoriesRequest } from '../../actions/category';
import { actAddStoryCategoryRequest } from '../../actions/story_categories';
import { actAddStoryRequest, actFetchStoriesRequest } from '../../actions/story';
import { Link } from 'react-router-dom';
import showAlert from '../../utils/showAlert';
import { showLoading } from '../../utils/helpers';

class AddStory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            baseImage: ""
        }
        this.nameRef = React.createRef();
        this.author_idRef = React.createRef();
        this.statusRef = React.createRef();
        this.descriptionRef = React.createRef();
    }

    componentDidMount() {
        this.props.fetchAllAuthors();
        this.props.fetchCategories();
    }

    renderAuthors = () => {
        if (this.props.authors.length > 0) {
            return this.props.authors.map((item, index) => {
                if (item.name === "Đang cập nhật") {
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

    findIndex = (list, id) => {
        var result = -1;
        list.forEach((item, index) => {
            if (item === id) {
                result = index;
            }
        })
        return result;
    }

    addClick = (e) => {
        if (this.nameRef.current.value === "") {
            showAlert("Không được để trống tên truyện", "warning")
        }
        else {
            if (window.confirm('Bạn có chắc muốn thêm ?')) {
                showLoading(true);
                var { history } = this.props;
                let newStory = {
                    name: this.nameRef.current.value,
                    author_id: this.author_idRef.current.value,
                    status: this.statusRef.current.value,
                    description: this.descriptionRef.current.value,
                    path_image: this.state.baseImage,
                }
                this.props.addStory(newStory);
                setTimeout(() => {
                    history.push("/stories");
                    this.props.fetchStories();
                }, 2000);
            }
        }
    }

    uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await this.convertBase64(file);
        console.log(base64);
        this.setState({
            baseImage: base64
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
        history.goBack();
    }
    render() {
        return (
            <div className="content-wrapper">
                <div className="main-content">
                    <h2><Link to={``} title="Quay lại" className="edit" onClick={(e) => this.backClick(e)}><i className="fa fa-chevron-left icon-back" /></Link>THÊM MỚI TRUYỆN</h2>
                    <div className="hr1" />

                    <label htmlFor="name">Tên truyện</label>
                    <input ref={this.nameRef} type="text" name="name" id="name" />

                    <label htmlFor="author">Tác giả</label>
                    <select ref={this.author_idRef} name="author" id="author">
                        {this.renderAuthors()}
                    </select>

                    <label htmlFor="category">Tình trạng</label>
                    <select ref={this.statusRef} name="status" id="status">
                        <option value="updating" selected>Đang cập nhật</option>
                        <option value="completed">Hoàn thành</option>
                    </select>

                    <label htmlFor="description">Mô tả ngắn</label>
                    <textarea ref={this.descriptionRef} name="description" id="description" />

                    <div>
                        <label htmlFor="file">Ảnh đại diện</label>
                        <img className="avatar" src={(this.state.baseImage === "") ? "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTYCD0gAC06agTM-YuJIA7oQ2i40I60ieaMrA&usqp=CAU" : this.state.baseImage} alt=""/>
                        <br />
                        <input type="file" name="file" id="file" onChange={(e) => { this.uploadImage(e) }} />
                    </div>


                    <button onClick={(e) => this.addClick(e)} >Thêm mới</button>
                </div>
            </div>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        authors: state.authors,
        categories: state.categories,
        storyEditing: state.storyEditing,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllAuthors: () => {
            dispatch(actFetchAuthorsRequest())
        },
        fetchCategories: () => {
            dispatch(actFetchCategoriesRequest())
        },
        addStory: (story) => {
            dispatch(actAddStoryRequest(story))
        },
        fetchStories: () => {
            dispatch(actFetchStoriesRequest())
        },
        addStoryCategory: (storyCategory) => {
            dispatch(actAddStoryCategoryRequest(storyCategory))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddStory)
