import callApi from './../utils/apiCaller';
import showAlert from '../utils/showAlert';
import { showLoading } from '../utils/helpers';


export const actAddChapterRequest = (chapter) => {
    return dispatch => {
        return callApi('chapter/add', 'POST', chapter).then(res => {
            dispatch(actAddChapter(res.data));
            dispatch(actGetNewChapter(res.data));
            showLoading(false);
            showAlert("Đã thêm chương mới thành công", "success");
        });
    };
}

export const actAddChapter = (chapter) => {
    return {
        type : 'ADD_CHAPTER',
        chapter
    }
}

export const actAddChapterImageRequest = (image) => {
    return dispatch => {
        return callApi('chapter/addImage', 'POST', image).then(res => {
            // dispatch(actFetchUsers(res.data));
        });
    };
}

export const actGetNewChapter = (chapter) => {
    return {
        type : 'GET_NEW_CHAPTER',
        chapter
    }
}

export const actFetchChaptersRequest = (story_id) => {
    return dispatch => {
        return callApi(`story/${story_id}/chapters`, 'GET', null).then(res => {
            dispatch(actFetchChapters(res.data));
        });
    };
}

export const actFetchChapters = (chapters) => {
    return {
        type : 'FETCH_CHAPTERS',
        chapters
    }
}

export const actGetChapterRequest = (id) => {
    return dispatch => {
        return callApi(`chapter/${id}`, 'GET', null).then(res => {
            dispatch(actGetChapter(res.data));

        });
    };
}

export const actGetChapter = (chapter) => {
    return {
        type : 'GET_CHAPTER',
        chapter
    }
}
export const actEditChapterRequest = (chapter) => {
    return dispatch => {
        return callApi(`chapter/${chapter.id}`, 'PUT', chapter).then(res => {
            dispatch(actEditChapter(chapter));
            showAlert("Đã sửa thành công", "success");
        });
    };
}

export const actEditChapter = (chapter) => {
    return {
        type : 'EDIT_CHAPTER',
        chapter
    }
}

export const actDeleteChapterRequest = (id) => {
    return dispatch => {
        return callApi(`chapter/${id}`, 'DELETE', null).then(res => {
            dispatch(actDeleteChapter(id));
            showLoading(false);
            showAlert("Đã xóa thành công", "success")
        });
    };
}

export const actDeleteChapter = (id) => {
    return {
        type : 'DELETE_CHAPTER',
        id
    }
}