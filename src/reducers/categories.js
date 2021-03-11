const InitialState = []
var findIndex = (list, id) => {
    var result = -1;
    list.forEach((item, index) => {
        if (item.id === id) {
            result = index;
        }
    })
    return result;
}
const categories = (state = InitialState, action) => {
    var index = -1;
    switch (action.type) {
        case 'FETCH_CATEGORIES':
            state = action.categories;
            return [...state]

        case 'SEARCH_CATEGORIES':
            state = action.categories;
            return [...state]

        case 'DELETE_CATEGORY':
            index = findIndex(state, action.id);
            state.splice(index, 1);
            return [...state]

        case 'ADD_CATEGORY':
            state.unshift(action.category);
            return [...state]

        case 'EDIT_CATEGORY':
            index = findIndex(state, action.category.id);
            state[index] = action.category;
            return [...state]

        default:
            return [...state]
    }
}

export default categories;