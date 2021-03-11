import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Link,
} from "react-router-dom";
import { actFetchStoriesRequest, actSearchStoriesRequest } from '../../actions/story';

class Search extends Component {

    constructor(props) {
        super(props);
        this.nameRef = React.createRef();
    }

    searchClick = () => {
        let name = this.nameRef.current.value;
        (name === "") ? this.props.fetchStories() : this.props.searchStories(name)
    }
    isChange = () => {
        let name = this.nameRef.current.value;
        (name === "") ? this.props.fetchStories() : this.props.searchStories(name)
    }

    render() {
        return (
            <div className="form-search fl-right">
                <Link to="/story/add" id="add-category" className="fl-left">Thêm mới</Link>
                <input type="submit" onClick={() => this.searchClick()} value="Tìm kiếm" />
                <input type="text" ref={this.nameRef} onChange={() => this.isChange()} placeholder={'Nhập tên...'} />
            </div>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        stories: state.stories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStories: () => {
            dispatch(actFetchStoriesRequest())
        },
        searchStories: (stories) => {
            dispatch(actSearchStoriesRequest(stories))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search)
