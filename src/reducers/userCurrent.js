var userData = localStorage.getItem("userData");
var user = JSON.parse(userData);
// if (userData) {
var InitialState = user;
// }
// else{
//     var InitialState = {};
// }
const userCurrent = (state = InitialState, action) => {
    switch (action.type) {
        case 'GET_USER_CURRENT':
            state = action.user
            return state
        default:
            return state
    }
}

export default userCurrent;