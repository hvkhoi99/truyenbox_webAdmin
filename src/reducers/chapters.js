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
const chapters = (state = InitialState, action) => {
    var index = -1;
    switch (action.type) {
        case 'FETCH_CHAPTERS':
            state = action.chapters;
            return [...state]
        
        case 'ADD_CHAPTER':
            state.unshift(action.chapter);
            return [...state]
        
        case 'DELETE_CHAPTER':
            index = findIndex(state, action.id)
            state.splice(index, 1);
            return [...state]
        
        case 'EDIT_CHAPTER':
            index = findIndex(state, action.chapter.id)
            state[index] = action.chapter;
            return [...state]
        
        default:
            return state
    }
}
export default chapters;