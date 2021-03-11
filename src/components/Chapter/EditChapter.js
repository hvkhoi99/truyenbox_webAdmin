import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actAddChapterImageRequest, actEditChapterRequest, actGetChapterRequest } from '../../actions/chapter';
import { actDeleteImagesRequest, actEditImageRequest, actFetchImagesRequest } from '../../actions/image';
import { actGetStoryByChapterIdRequest } from '../../actions/story';
import { showLoading } from '../../utils/helpers';

class EditChapter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            chapter: {},
            story: {},
            pages: 0,
            page: [],
            stt: [],
            changeName: false,
            changeImage: false,
        }
        this.pagesRef = React.createRef();
        this.nameRef = React.createRef();
    }

    componentDidMount() {
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            if (id) {
                this.props.fetchImages(id);
                this.props.getChapter(id);
                this.props.getStoryByChapterId(id);
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.storyEditing && nextProps.chapterGetting && nextProps.images) {
            var { storyEditing, chapterGetting, images } = nextProps;
            this.setState({
                images: images,
                chapter: chapterGetting,
                story: storyEditing,
                pages: chapterGetting.pages 
            })
        }
    }
    handleChange = () => {
        this.setState({
            changeName: true
        })
    }
    // changePath = (e) => {
    //     let name = e.target.name;
    //     let value = e.target.value;
    //     var path = {
    //         stt: name,
    //         path_image: value
    //     }
    //     this.state.page = this.state.page.filter(x => (x.stt !== path.stt))
    //     this.state.page.push(path);
    // }

    saveClick = async (e) => {
        e.preventDefault();
        var { history } = this.props;
        if (this.nameRef.current.value === "") {
            alert('Không được để trống Tên chương');
        }
        else {
            if (window.confirm('Bạn có chắc muốn sửa ?')) {
                showLoading(true);
                if (this.state.changeImage) {
                    if (this.state.images.length > 0) {
                        for (var image of this.state.images) {
                            await this.props.addChapterImage(image);
                        }
                    }
                }
                
                if (this.state.changeName) {
                    let chapter = {
                        id: this.state.chapter.id,
                        name: this.nameRef.current.value,
                        story_id: this.state.story.id,
                        pages: this.state.pages
                    }
                    await this.props.editChapter(chapter);
                }
                history.push(`/story/${this.state.story.id}`);
            }
        }
    }

    handleImageChange = async (e) => {
        const files = [];
        for (let file of e.target.files) {
            var base64 = await this.convertBase64(file);
            var image = { path_image: base64, chapter_id: this.state.chapter.id }
            files.push(image);
        }
        this.setState({
            images: files,
            pages: files.length,
            changeImage: true
        }
        );
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

    deleteAllHandler = async () => {
        if (window.confirm('Bạn có chắc muốn xóa tất cả ?')) {
            await this.props.deteleImages(this.state.chapter.id);
            var chapter = {
                id: this.state.chapter.id,
                pages: 0
            }
            await this.props.editChapter(chapter)
            this.setState({
                images: []
            })
        }
    }

    renderImage = () => {
        if (this.state.images.length > 0) {
            return this.state.images.map((item, index) => {
                return (
                    <img src={item.path_image} alt="" className="img-selected" key={index} />
                )
            })
        }
    }

    renderButtonUpload = () => {
        if (this.state.images.length < 1) {
            return (
                <>
                    <label htmlFor="file">Upload</label>
                    <input type="file" id="file" multiple onChange={this.handleImageChange} />
                </>
            )
        }
    }

    backClick = (e) => {
        e.preventDefault();
        var { history } = this.props;
        history.goBack();
    }

    render() {
        console.log(this.state.images)
        return (
            <div className="content-wrapper" >
                <div className="main-content">
                    <h2><Link to={``} title="Quay lại" className="edit" onClick={(e) => this.backClick(e)}><i className="fa fa-chevron-left icon-back" /></Link>SỬA THÔNG TIN CHƯƠNG ({this.state.story.name})</h2>
                    <div className="hr1" />
                    <label htmlFor="name">Tên chương</label>
                    <input type="text" name="name" id="name" onChange={() => this.handleChange()} ref={this.nameRef} defaultValue={this.state.chapter.name} />

                    <div className="list-img">
                        {this.renderImage()}
                    </div>

                    {this.renderButtonUpload()}
                    <br></br>
                    <Link onClick={() => this.deleteAllHandler()}>Xóa tất cả ảnh và upload lại ?</Link>

                    <button onClick={(e) => this.saveClick(e)}>Lưu </button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        storyEditing: state.storyEditing,
        chapterGetting: state.chapterGetting,
        images: state.images,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getStoryByChapterId: (id) => {
            dispatch(actGetStoryByChapterIdRequest(id))
        },
        getChapter: (id) => {
            dispatch(actGetChapterRequest(id))
        },
        fetchImages: (id) => {
            dispatch(actFetchImagesRequest(id))
        },
        editImage: (image) => {
            dispatch(actEditImageRequest(image))
        },
        addChapterImage: (image) => {
            dispatch(actAddChapterImageRequest(image))
        },
        editChapter: (chapter) => {
            dispatch(actEditChapterRequest(chapter))
        },
        deteleImages: (chapter_id) => {
            dispatch(actDeleteImagesRequest(chapter_id))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditChapter)