const InitialState = {}

const authorEditing = (state = InitialState, action) => {
    switch (action.type) {
        case 'GET_AUTHOR':
            state = action.author;
            return {...state};
            
        case 'GET_AUTHOR_BY_STORY_ID':
            state = action.author;
            return {...state};

        default:
            return {...state}
    }
}

export default authorEditing;