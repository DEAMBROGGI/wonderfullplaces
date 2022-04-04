import { combineReducers } from 'redux'
import placesReducer from './placesReducer'
import userReducer from './userReducer'
import socketReducer from './socketsReducer'

const mainReducer = combineReducers({

    socketReducer,
    placesReducer,
    userReducer

})
export default mainReducer