const InitialState = []
const storyCategories  = (state = InitialState, action) => {
    switch (action.type) {
        case 'FETCH_STORY_CATEGORIES':
            state = action.categories;
            return [...state]
            
        default:
            return state
    }
}

export default storyCategories;