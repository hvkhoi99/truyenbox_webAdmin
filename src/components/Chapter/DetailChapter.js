import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actGetStoryByChapterIdRequest } from '../../actions/story';
import { actGetChapterRequest } from '../../actions/chapter';
import { actFetchImagesRequest } from '../../actions/image';
import { Link } from 'react-router-dom';

class DetailChapter extends Component {

    componentDidMount() {
        var { match } = this.props;
        var { history } = this.props;
        console.log(history)
        if (match) {
            var id = match.params.id;
            this.props.getStoryByChapterId(id);
            this.props.getChapter(id);
            this.props.fetchImages(id);
        }
    }

    backClick = (e) => {
        e.preventDefault();
        var { history } = this.props;
        history.goBack();
    }

    render() {
        const listImage = this.props.images.map((item, index) => {
            return (
                <img src={item.path_image} alt="" className="read" key={index} />
            )
        })
        return (
            <div className="content-wrapper">
                <div className="main-list">
                    <h2 className="fl-left uppercase"><Link to={``} title="Quay lại" className="edit" onClick={(e) => this.backClick(e)}><i className="fa fa-chevron-left icon-back" /></Link>{this.props.storyEditing.name} ({this.props.chapterGetting.name})</h2>
                    <div className="hr" />
                    {listImage}
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailChapter)