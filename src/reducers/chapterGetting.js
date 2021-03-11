const InitialState = {}
const chapterGetting = (state = InitialState, action) => {
    switch (action.type) {
        case 'GET_NEW_CHAPTER':
            state = action.chapter
            return {...state}

        case 'GET_CHAPTER':
            state = action.chapter
            return {...state}
        
        default:
            return state
    }
}

export default chapterGetting;