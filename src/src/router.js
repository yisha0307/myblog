// 定义前端路由表
import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/home'

export default () => {
    return <Router>
        <section>
            <Header />
            <Switch>
                <Route exact path='/' component={Home}></Route>
            </Switch>
        </section>
    </Router>
}