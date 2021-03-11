import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actGetStoryRequest } from '../../actions/story'
import { actAddChapterRequest, actAddChapterImageRequest } from '../../actions/chapter'
import { Link } from 'react-router-dom';
import { showLoading } from '../../utils/helpers';

class AddChapter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            pages: 0,
            page: [],
            selectedFiles: []
        }
        this.pagesRef = React.createRef();
        this.nameRef = React.createRef();
    }

    componentDidMount() {
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            if (id) {
                this.setState({
                    id: id
                })
                this.props.getStory(id);
            }
        }
    }

    addClickChapter = (e) => {
        e.preventDefault();
        // if (this.nameRef.current.value === '' || this.state.pages < 1 || this.state.page.length < 1) {
        if (this.nameRef.current.value === '' || this.state.pages < 1) {
            alert('Lỗi chưa nhập tên hoặc chưa upload ảnh');
        }
        else {
            showLoading(true);
            var chapter = {
                name: this.nameRef.current.value,
                pages: parseInt(this.state.pages),
                story_id: this.props.storyEditing.id
            }
            if (window.confirm('Bạn có chắc muốn thêm ?')) {
                this.props.addChapter(chapter);
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.chapterGetting) {
            var { chapterGetting } = nextProps;
            var { history } = this.props;

            for (let item of this.state.selectedFiles) {
                var image = {
                    path_image: item,
                    chapter_id: chapterGetting.id
                }
                this.props.addChapterImage(image);
                setTimeout(() => {
                    history.push(`/story/${this.state.id}`);
                }, 2000);
            }
        }
    }

    handleImageChange = async (e) => {
        const files = [];
        for (let file of e.target.files) {
            var base64 = await this.convertBase64(file);
            files.push(base64);
        }
        this.setState({
            selectedFiles: files,
            pages: files.length
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

    renderPhotos = (source) => {
        return source.map((photo) => {
            return <img src={photo} alt="" className="img-selected" key={photo} />

        });
    };

    backClick = (e) => {
        e.preventDefault();
        var { history } = this.props;
        history.goBack();
    }


    render() {
        console.log(this.state.selectedFiles);
        return (
            <div className="content-wrapper" >
                <div className="main-content">
                    <h2><Link to={``} title="Quay lại" className="edit" onClick={(e) => this.backClick(e)}><i className="fa fa-chevron-left icon-back" /></Link>THÊM MỚI CHƯƠNG ({this.props.storyEditing.name})</h2>
                    <div className="hr1" />
                    <label htmlFor="name">Tên chương</label>
                    <input type="text" name="name" id="name" ref={this.nameRef} />

                    <div>
                        <label htmlFor="file">Upload</label>
                        <input type="file" id="file" multiple onChange={this.handleImageChange} />

                        <div className="list-img">
                            {this.renderPhotos(this.state.selectedFiles)}
                        </div>
                    </div>

                    <button onClick={(e) => this.addClickChapter(e)}>Thêm mới chương</button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        storyEditing: state.storyEditing,
        chapterGetting: state.chapterGetting,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getStory: (id) => {
            dispatch(actGetStoryRequest(id))
        },
        addChapter: (chapter) => {
            dispatch(actAddChapterRequest(chapter))
        },
        addChapterImage: (image) => {
            dispatch(actAddChapterImageRequest(image))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddChapter)