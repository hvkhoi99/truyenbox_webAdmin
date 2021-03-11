import callApi from './../utils/apiCaller';


// get list story
export const actFetchImagesRequest = (id) => {
    return dispatch => {
        return callApi(`images/chapter/${id}`, 'GET', null).then(res => {
            dispatch(actFetchImages(res.data));
        });
    };
}

export const actFetchImages = (images) => {
    return {
        type : 'FETCH_IMAGES',
        images
    }
}

// get list story
export const actEditImageRequest = (image) => {
    return dispatch => {
        return callApi(`image/chapter/${image.chapter_id}/stt/${image.stt}`, 'PUT', image).then(res => {
            // dispatch(actEditImage(image));
        });
    };
}

export const actEditImage = (image) => {
    return {
        type : 'EDIT_IMAGE',
        image
    }
}
// delete images by chapter id
export const actDeleteImagesRequest = (chapter_id) => {
    return dispatch => {
        return callApi(`images/chapter/${chapter_id}`, 'DELETE', null).then(res => {
            // dispatch(actEditImage(image));
        });
    };
}



