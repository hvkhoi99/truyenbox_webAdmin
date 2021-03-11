const InitialState = {}
const categoryEditing = (state = InitialState, action) => {
    switch (action.type) {
        case 'GET_CATEGORY':
            state = action.category;
            return {...state}
        
        default:
            return {...state}
    }
}

export default categoryEditing;