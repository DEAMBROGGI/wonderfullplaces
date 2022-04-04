import userList from "../../components/User/userList"

const initialState = {
    socket: "",
    userList:[]
    
}

const socketReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case 'socket':
            return {
                ...state,
                socket: action.payload,
            }
            case 'usersConected':
            return {
                ...state,
                userList: action.payload,
            }
        case 'userList':
                state.socket.emit('userList')
            
        default:
            return state
    }
}
export default socketReducer