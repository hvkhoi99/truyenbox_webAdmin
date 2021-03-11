import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actFetchFeedbacksRequest } from '../../actions/feedback';
import Pagination from '../Author/Pagination';
import FeedbackItem from './FeedbackItem';
import Search from './Search'

class ListFeedback extends Component {
    componentDidMount() {
        this.props.getFeedbacks();
    }
    
    backClick = (e) => {
        e.preventDefault();
        var { history } = this.props;
        if (history) {
            history.goBack();
        }
    }
    render() {
        const listFeedback = this.props.feedbacks.map((item, key) => (
            <FeedbackItem feedback={item} key={key} stt={key + 1} />
        ))
        return (
            <div className="content-wrapper">
                <div className="main-list">
                    <h2 className="fl-left"><Link to={``} title="Quay lại" className="edit" onClick={(e) => this.backClick(e)}><i className="fa fa-chevron-left icon-back" /></Link>DANH SÁCH PHẢN HỒI</h2>
                    <div className="hr" />
                    <Search />
                    <div className="list">
                        <table className="content-table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                    <th>Account</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listFeedback}
                            </tbody>
                        </table>
                    </div>
                    <div className="num-record">(Có {this.props.feedbacks.length} bản ghi)</div>
                    <Pagination />
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        feedbacks: state.feedbacks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFeedbacks: () => {
            dispatch(actFetchFeedbacksRequest())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListFeedback)