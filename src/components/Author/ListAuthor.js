import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actFetchAuthorsRequest } from '../../actions/author';
import AuthorItem from './AuthorItem';
import Pagination from './Pagination';
import Search from './Search';

class ListAuthor extends Component {
    componentDidMount() {
        this.props.fetchAllAuthors();
    }
    backClick = (e) => {
        e.preventDefault();
        var { history } = this.props;
        if(history){
            history.goBack();
        }
    }

    render() {
        const listAuthor = this.props.authors.map((item, key) => (
            <AuthorItem author={item} key={key} stt={key + 1} />
        ))
        return (
            <div className="content-wrapper">
                <div className="main-list">
                    <h2 className="fl-left"><Link to={``} title="Quay lại" className="edit" onClick={(e) => this.backClick(e)}><i className="fa fa-chevron-left icon-back" /></Link>DANH SÁCH TÁC GIẢ</h2>
                    <div className="hr" />
                    <Search />
                    <div className="list">
                        <table className="content-table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên tác giả</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listAuthor}
                            </tbody>
                        </table>
                    </div>
                    <div className="num-record">(Có {this.props.authors.length} bản ghi)</div>
                    <Pagination />
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        authors: state.authors
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchAllAuthors: () => {
            dispatch(actFetchAuthorsRequest())
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListAuthor);


