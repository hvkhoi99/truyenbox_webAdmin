const InitialState = false
const isRedirect = (state = InitialState, action) => {
    switch (action.type) {
        case 'TRUE_REDIRECT':
            state= true;
            return state
        case 'FALSE_REDIRECT':
            state = false;
            return state
        default:
            return state
    }
}

export default isRedirect;