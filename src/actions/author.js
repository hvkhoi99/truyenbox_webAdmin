import callApi from './../utils/apiCaller';
import showAlert from '../utils/showAlert';
import { showLoading } from '../utils/helpers';


export const actFetchAuthorsRequest = () => {
    return dispatch => {
        return callApi('authors', 'GET', null).then(res => {
            dispatch(actFetchAuthors(res.data));
        }).catch(err=>{
            console.log(err)
        });
    };
}

export const actFetchAuthors = (authors) => {
    return {
        type : 'FETCH_AUTHORS',
        authors
    }
}

export const actAddAuthor = (author) => {
    return {
        type : 'ADD_AUTHOR',
        author
    }
}

export const actAddAuthorRequest = (author) => {
    return dispatch => {
        return callApi('author/add', 'POST', author).then(res => {
            dispatch(actAddAuthor(res.data));
            showLoading(false);
            showAlert("Đã thêm tác giả thành công", "success")
        });
    };
}

export const actDeleteAuthor = (id) => {
    return {
        type : 'DELETE_AUTHOR',
        id
    }
}

export const actDeleteAuthorRequest = (id) => {
    return dispatch => {
        return callApi(`author/${id}`, 'DELETE', null).then(res => {
            dispatch(actDeleteAuthor(id));
            showLoading(false);
            showAlert("Đã xóa tác giả thành công", "success")
        });
    };
}

export const actSearchAuthor = (authorsSearch) => {
    return {
        type : 'SEARCH_AUTHOR',
        authorsSearch
    }
}

export const actSearchAuthorRequest = (name) => {
    return dispatch => {
        return callApi(`author/search/${name}`, 'GET', null).then(res => {
            dispatch(actSearchAuthor(res.data));
        });
    };
}

export const actGetAuthor = (author) => {
    return {
        type : 'GET_AUTHOR',
        author
    }
}

export const actGetAuthorRequest = (id) => {
    return dispatch => {
        return callApi(`author/${id}`, 'GET', null).then(res => {
            dispatch(actGetAuthor(res.data));
        });
    };
}

export const actEditAuthor = (author) => {
    return {
        type : 'EDIT_AUTHOR',
        author
    }
}

export const actEditAuthorRequest = (author) => {
    return dispatch => {
        return callApi(`author/${author.id}`, 'PUT', author).then(res => {
            dispatch(actEditAuthor(author));
            showLoading(false);
            showAlert("Đã sửa thông tin tác giả thành công", "success");
        });
    };
}

export const actGetAuthorByStoryId = (author) => {
    return {
        type : 'GET_AUTHOR_BY_STORY_ID',
        author
    }
}

export const actGetAuthorByStoryIdRequest = (id) => {
    return dispatch => {
        return callApi(`author/story/${id}`, 'GET', null).then(res => {
            dispatch(actGetAuthorByStoryId(res.data));
        });
    };
}