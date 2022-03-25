import { combineReducers } from 'redux'
import placesReducer from './placesReducer'
import userReducer from './userReducer'

const mainReducer = combineReducers({

    placesReducer,
    userReducer

})
export default mainReducer