import { showLoading } from '../utils/helpers';
import showAlert from '../utils/showAlert';
import callApi from './../utils/apiCaller';

export const actFetchCategoriesRequest = () => {
    return dispatch => {
        return callApi('categories', 'GET', null).then(res => {
            dispatch(actFetchCategories(res.data));
        });
    };
}

export const actFetchCategories = (categories) => {
    return {
        type: 'FETCH_CATEGORIES',
        categories
    }
}


export const actSearchCategoriesRequest = (name) => {
    return dispatch => {
        return callApi(`category/search/${name}`, 'GET', null).then(res => {
            dispatch(actSearchCategories(res.data));
        });
    };
}

export const actSearchCategories = (categories) => {
    return {
        type: 'SEARCH_CATEGORIES',
        categories
    }
}

export const actAddCategoryRequest = (category) => {
    return dispatch => {
        return callApi(`category/add`, 'POST', category).then(res => {
            dispatch(actAddCategory(res.data));
            showLoading(false);
            showAlert("Đã thêm chuyên mục thành công", "success")
        });
    };
}

export const actAddCategory = (category) => {
    return {
        type: 'ADD_CATEGORY',
        category
    }
}
export const actDeleteCategoryRequest = (id) => {
    return dispatch => {
        return callApi(`category/${id}`, 'DELETE', null).then(res => {
            dispatch(actDeleteCategory(id));
            showLoading(false);
            showAlert("Đã xóa thành công", "success")
        });
    };
}

export const actDeleteCategory = (id) => {
    return {
        type: 'DELETE_CATEGORY',
        id
    }
}

export const actGetCategoryRequest = (id) => {
    return dispatch => {
        return callApi(`category/${id}`, 'GET', null).then(res => {
            dispatch(actGetCategory(res.data));
        });
    };
}

export const actGetCategory = (category) => {
    return {
        type: 'GET_CATEGORY',
        category
    }
}

export const actEditCategoryRequest = (category) => {
    return dispatch => {
        return callApi(`category/${category.id}`, 'PUT', category).then(res => {
            dispatch(actEditCategory(category));
            showLoading(false);
            showAlert("Đã sửa thông tin chuyên mục thành công", "success");
        });
    };
}

export const actEditCategory = (category) => {
    return {
        type: 'EDIT_CATEGORY',
        category
    }
}