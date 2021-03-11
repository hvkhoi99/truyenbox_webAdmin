import React, { Component } from 'react';
import Search from './Search';
import { connect } from 'react-redux';
import { actFetchCategoriesRequest } from '../../actions/category';
import Pagination from './Pagination';
import CategoryItem from './CategoryItem';
import { Link } from 'react-router-dom';

class ListCategory extends Component {

    componentDidMount() {
        this.props.fetchCategories();
    }

    backClick = (e) => {
        e.preventDefault();
        var { history } = this.props;
        history.goBack();
    }
    
    render() {

        console.log(this.props.categories);

        const listCategory = this.props.categories.map((item, index) => {
            return(
                <CategoryItem stt={index+1} cate={item} key={index}/>
            ) 
        })

        return (
            <div className="content-wrapper">
                <div className="main-list">
                    <h2 className="fl-left"><Link to={``} title="Quay lại" className="edit" onClick={(e) => this.backClick(e)}><i className="fa fa-chevron-left icon-back" /></Link>DANH SÁCH CHUYÊN MỤC</h2>
                    <div className="hr" />
                    <Search/>
                    <div className="list">
                        <table className="content-table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên chuyên mục</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listCategory}
                            </tbody>
                        </table>
                    </div>
                    <div className="num-record">(Có {this.props.categories.length} bản ghi)</div>
                    <Pagination/>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => {
            dispatch(actFetchCategoriesRequest())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListCategory)





