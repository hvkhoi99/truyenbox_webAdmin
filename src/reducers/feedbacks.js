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
const feedbacks = (state = InitialState, action) => {
    var index = -1;
    switch (action.type) {
        case 'GET_FEEDBACKS':
            state = action.feedbacks
            return [...state]

        case 'DELETE_FEEDBACK':
            index = findIndex(state, action.id);
            state.splice(index, 1);
            return [...state];
        
        default:
            return state
    }
}
export default feedbacks;