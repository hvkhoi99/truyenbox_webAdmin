import callApi from './../utils/apiCaller';
import showAlert from '../utils/showAlert';
import { showLoading } from '../utils/helpers';


// get list story
export const actFetchStoriesRequest = () => {
    return dispatch => {
        return callApi('stories', 'GET', null).then(res => {
            dispatch(actFetchStories(res.data));
        }).catch(error => {
            showAlert(error, 'danger');
        });
    };
}

export const actFetchStories = (stories) => {
    return {
        type : 'FETCH_STORIES',
        stories
    }
}

// search story
export const actSearchStoriesRequest = (name) => {
    return dispatch => {
        return callApi(`story/search/${name}`, 'GET', null).then(res => {
            dispatch(actSearchStories(res.data));
        }).catch(error => {
            showAlert(error, 'danger');
        });
    };
}

export const actSearchStories = (stories) => {
    return {
        type : 'SEARCH_STORIES',
        stories
    }
}

// delete story
export const actDeleteStoryRequest = (id) => {
    return dispatch => {
        return callApi(`story/${id}`, 'DELETE', null).then(res => {
            dispatch(actDeleteStory(id));
            showLoading(false);
            showAlert("Đã xóa truyện thành công", "success")
        }).catch(error => {
            showAlert(error, 'danger');
        });
    };
}

export const actDeleteStory = (id) => {
    return {
        type : 'DELETE_STORY',
        id
    }
}
// add story
export const actAddStoryRequest = (story) => {
    return dispatch => {
        return callApi('story/add', 'POST', story).then(res => {
            dispatch(actGetNewStory(res.data));
            // dispatch(actAddStory(res.data));
            showLoading(false);
            showAlert("Đã thêm truyện thành công", "success")
        }).catch(error => {
            showAlert(error, 'danger');
        });
    };
}

export const actAddStory = (story) => {
    return {
        type : 'ADD_STORY',
        story
    }
}

// GET_NEW_STORY
export const actGetNewStory = (story) => {
    return {
        type : 'GET_NEW_STORY',
        story
    }
}
// get story
export const actGetStoryRequest = (id) => {
    return dispatch => {
        return callApi(`story/${id}`, 'GET', null).then(res => {
            dispatch(actGetStory(res.data));
        }).catch(error => {
            showAlert(error, 'danger');
        });
    };
}

export const actGetStory = (story) => {
    return {
        type : 'GET_STORY',
        story
    }
}
// edit story
export const actEditStoryRequest = (story) => {
    return dispatch => {
        return callApi(`story/${story.id}`, 'PUT', story).then(res => {
            // dispatch(actEditStory(story));
            showLoading(false);
            showAlert('Đã sửa thành công', 'success');
        }).catch(error => {
            showAlert(error, 'danger');
        });
    };
}

// export const actEditStory = (story) => {
//     return {
//         type : 'EDIT_STORY',
//         story
//     }
// }

export const actGetStoryByChapterIdRequest = (id) => {
    return dispatch => {
        return callApi(`story/chapter/${id}`, 'GET', null).then(res => {
            dispatch(actGetStoryByChapterId(res.data));
        }).catch(error => {
            showAlert(error, 'danger');
        });
    };
}

export const actGetStoryByChapterId = (story) => {
    return {
        type : 'GET_STORY_BY_CHAPTER',
        story
    }
}