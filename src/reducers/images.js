const InitialState = []
const images = (state = InitialState, action) => {
    switch (action.type) {
        case 'FETCH_IMAGES':
            state = action.images
            return [...state]
        default:
            return state
    }
}

export default images;