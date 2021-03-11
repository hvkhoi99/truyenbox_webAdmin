import React, { Component } from 'react'
import { connect } from 'react-redux';
import { actDeleteFeedbackRequest } from '../../actions/feedback';

class FeedbackItem extends Component {

    deleteClick = (e, id) => {
        e.preventDefault();
        if(window.confirm('Bạn có chắc muốn xóa ?')){
            this.props.deleteFeedback(id);
        }
    }
    render() {
        const { feedback } = this.props;
        return (
            <tr>
                <td>{this.props.stt}</td>
                <td>{feedback.subject}</td>
                <td>{feedback.message}</td>
                <td>{feedback.email}</td>
                <td>
                    <a href='/' title="Xóa" className="delete" onClick={(e) => { this.deleteClick(e, feedback.id) }}><i className="fa fa-trash icon" /></a>
                </td>
            </tr>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteFeedback: (id) => {
            dispatch(actDeleteFeedbackRequest(id))
        }
    }
}
export default connect(null, mapDispatchToProps)(FeedbackItem)
