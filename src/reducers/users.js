const InitialState = []
var findIndex = (users, id) => {
    var result = -1;
    users.forEach((user, index) => {
        if (user.id === id) {
            result = index;
        }
    })
    return result;
}
const users = (state = InitialState, action) => {
    var index = -1;
    switch (action.type) {
        case 'FETCH_USERS':
            state = action.users;
            return [...state]

        case 'SEARCH_USERS':
            state = action.users;
            return [...state];

        case 'DELETE_USER':
            index = findIndex(state, action.id);
            state.splice(index, 1);
            return [...state];
        default:
            return [...state]
    }
}

export default users;