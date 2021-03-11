const InitialState = {}
const storyEditing = (state = InitialState, action) => {
    switch (action.type) {
        case 'GET_STORY':
            state = action.story;
            return { ...state }

        case 'GET_STORY_BY_CHAPTER':
            state = action.story;
            return { ...state }

        case 'GET_NEW_STORY':
            state = action.story
            return { ...state }
        default:
            return state
    }
}
export default storyEditing;