import callApi from './../utils/apiCaller';


export const actFetchFeedbacksRequest = () => {
    return dispatch => {
        return callApi('feedbacks', 'GET', null).then(res => {
            dispatch(actFetchFeedbacks(res.data));
        }).catch(err=>{
            console.log(err)
        });
    };
}

export const actFetchFeedbacks = (feedbacks) => {
    return {
        type : 'GET_FEEDBACKS',
        feedbacks
    }
}

export const actDeleteFeedbackRequest = (id) => {
    return dispatch => {
        return callApi(`feedback/${id}`, 'DELETE', null).then(res => {
            dispatch(actDeleteFeedback(id));
        });
    };
}

export const actDeleteFeedback = (id) => {
    return {
        type : 'DELETE_FEEDBACK',
        id
    }
}