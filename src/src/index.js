import React from 'react'
import ReactDOM from 'react-dom'
import './style/index.css'
import Router from './router'
// 注入redux的store
import {Provider} from 'react-redux'
import store from './store'

ReactDOM.render( <Provider store = {store}>
    <Router />
</Provider>, document.getElementById('root'))