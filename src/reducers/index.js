import { combineReducers } from 'redux';
import authors from './authors';
import authorEditing from './authorEditing';
import isRedirect from './isRedirect';
import users from './users';
import categories from './categories';
import categoryEditing from './categoryEditing';
import stories from './stories';
import storyEditing from './storyEditing';
import chapters from './chapters';
import chapterGetting from './chapterGetting';
import images from './images';
import storyCategories from './storyCategories';
import isLogin from './isLogin';
import userCurrent from './userCurrent';
import userGetting from './userGetting';
import feedbacks from './feedbacks';

const appReducers = combineReducers({
    authors,
    authorEditing,
    isRedirect,
    users,
    categories,
    categoryEditing,
    stories,
    storyEditing,
    chapters,
    chapterGetting,
    images,
    storyCategories,
    isLogin,
    userCurrent,
    userGetting,
    feedbacks
});

export default appReducers;