import { createStore, applyMiddleware, compose } from "redux"
// use redux devtool @ chrome
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import thunk from 'redux-thunk'

const middleware = composeWithDevTools(applyMiddleware(thunk))

export default createStore(rootReducer, middleware)