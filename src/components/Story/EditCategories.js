import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { actFetchCategoriesRequest } from '../../actions/category';
import { actGetStoryRequest } from '../../actions/story';
import { actAddStoryCategoryRequest, actDeleteStoryCategoryRequest, actFetchStoryCategoriesRequest } from '../../actions/story_categories';

class EditCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            storyCategories: [],
            tmpCategoriesChecked: [],
            changeInfoStory: false,
        }
    }
    componentDidMount() {
        this.props.fetchCategories();
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            this.props.getStoryById(id);
            this.props.fetchStoryCategories(id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.storyEditing && nextProps.storyCategories) {
            var { storyEditing } = nextProps;
            var { storyCategories } = nextProps;
            this.setState({
                id: storyEditing.id,
                name: storyEditing.name,
                storyCategories: storyCategories
            });
        }
    }

    renderCategories = () => {
        if (this.state.storyCategories.length > 0) {
            for (let item of this.state.storyCategories) {
                this.state.tmpCategoriesChecked.push(item.id);
            }
        }
        if (this.props.categories.length > 0) {
            return this.props.categories.map((item, index) => {
                if (this.state.tmpCategoriesChecked.indexOf(item.id) !== -1) {
                    return (
                        <label><input defaultChecked type="checkbox" onClick={(e, id) => this.changeCheckBox(e, item.id)} value={item.id} id={item.id} />{item.name}</label>
                    )
                }
                else {
                    return (
                        <label><input type="checkbox" onChange={(e, id) => this.changeCheckBox(e, item.id)} value={item.id} id={item.id} />{item.name}</label>
                    )
                }
            })
        }
        else {
            return (
                <label>Loading</label>
            )
        }
    }

    changeCheckBox = (e, id) => {
        var storyCategory = {
            story_id: this.state.id,
            category_id: id
        }
        if (this.state.tmpCategoriesChecked.indexOf(id) !== -1) {
            this.props.deleteStoryCategory(storyCategory);
            let index = this.findIndex(this.state.tmpCategoriesChecked, id);
            this.state.tmpCategoriesChecked.splice(index, 1);
        }
        else {
            this.props.addStoryCategory(storyCategory);
            this.state.tmpCategoriesChecked.push(id);
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

    backClick = (e) => {
        e.preventDefault();
        var { history } = this.props;
        if (history) { history.goBack(); }
    }
    render() {
        return (
            <div className="content-wrapper">
                <div className="main-content">
                    <h2><Link to={``} title="Quay lại" className="edit" onClick={(e) => this.backClick(e)}><i className="fa fa-chevron-left icon-back" /></Link>SỬA CHUYỆN MỤC ({this.props.storyEditing.name}) </h2>
                    <div className="hr1" />
                    <label htmlFor="category">Chọn chuyên mục</label>
                    <div className="multiselect">
                        <div id="checkboxes">
                            {this.renderCategories()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        storyEditing: state.storyEditing,
        categories: state.categories,
        storyCategories: state.storyCategories,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getStoryById: (id) => {
            dispatch(actGetStoryRequest(id))
        },
        fetchCategories: () => {
            dispatch(actFetchCategoriesRequest())
        },
        fetchStoryCategories: (id) => {
            dispatch(actFetchStoryCategoriesRequest(id))
        },
        addStoryCategory: (storyCategory) => {
            dispatch(actAddStoryCategoryRequest(storyCategory))
        },

        deleteStoryCategory: (storyCategory) => {
            dispatch(actDeleteStoryCategoryRequest(storyCategory))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditCategories)