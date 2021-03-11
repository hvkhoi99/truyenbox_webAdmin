import callApi from './../utils/apiCaller';

export const actAddStoryCategoryRequest = (storyCategory) => {
    return dispatch => {
        return callApi('storyCategory/add', 'POST', storyCategory).then(res => {
            // dispatch(actFetchAuthors(res.data));
        });
    };
}

export const actFetchStoryCategoriesRequest = (id) => {
    return dispatch => {
        return callApi(`categories/story/${id}`, 'GET', null).then(res => {
            dispatch(actFetchStoryCategories(res.data));
        });
    };
}

export const actFetchStoryCategories = (categories) => {
    return {
        type : 'FETCH_STORY_CATEGORIES',
        categories
    }
}

export const actDeleteStoryCategoriesRequest = (id) => {
    return dispatch => {
        return callApi(`storyCategory/deleteCategories/${id}`, 'DELETE', null)
    };
}
export const actDeleteStoryCategoryRequest = (storyCategory) => {
    return dispatch => {
        return callApi(`storyCategory/delete/story/${storyCategory.story_id}/category/${storyCategory.category_id}`, 'DELETE', null)
    };
}