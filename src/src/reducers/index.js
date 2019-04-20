import { combineReducers } from 'redux'
import commonReducers from './commonReducer'
import postReducers from './postReducer'

const allReducers = {
    commonReducers,
    postReducers
}

const rootReducer = combineReducers(allReducers)
export default rootReducer