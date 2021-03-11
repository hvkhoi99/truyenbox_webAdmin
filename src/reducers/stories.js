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
const stories = (state = InitialState, action) => {
    var index = -1;
    switch (action.type) {
        case 'FETCH_STORIES':
            state = action.stories;
            return [...state]

        case 'SEARCH_STORIES':
            state = action.stories;
            return [...state]

        case 'DELETE_STORY':
            index = findIndex(state, action.id);
            state.splice(index, 1);
            return [...state]

        case 'ADD_STORY':
            state.unshift(action.story);
            return [...state]

        // case 'EDIT_STORY':
        //     index = findIndex(state, action.story.id);
        //     state[index] = action.story;
        //     return [...state]

        default:
            return [...state]
    }
}

export default stories;