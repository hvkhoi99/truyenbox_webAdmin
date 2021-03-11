const initialState = [];
var findIndex = (authors, id) => {
    var result = -1;
    authors.forEach((author, index) => {
        if (author.id === id) {
            result = index;
        }
    })
    return result;
}
const authors = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {
        case 'FETCH_AUTHORS':
            state = action.authors;
            return [...state];
            
        case 'ADD_AUTHOR':
            state.unshift(action.author);
            return [...state];

        case 'DELETE_AUTHOR':
            index = findIndex(state, action.id);
            state.splice(index, 1);
            return [...state];

        case 'SEARCH_AUTHOR':
            state = action.authorsSearch; 
            return [...state]

        case 'EDIT_AUTHOR':
            index = findIndex(state, action.author.id);
            state[index] = action.author;
            return [...state]

        default:
            return [...state]
    }
}

export default authors;