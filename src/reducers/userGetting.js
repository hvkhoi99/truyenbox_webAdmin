const InitialState = {}
const userGetting = (state = InitialState, action) => {
    switch (action.type) {
        case 'GET_USER_EDIT':
            state = action.user
            return {...state}
        
        default:
            return state
    }
}

export default userGetting;