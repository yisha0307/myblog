// 定义前端路由表
import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './components/Header'
import NavSetting from './components/navSetting'
import Home from './pages/home'
import LogIn from './pages/login'
import Signup from './pages/signup'
import Create from './pages/create'
import Edit from './pages/edit'
import Post from './pages/post'
import 'antd/dist/antd.css'

export default () => {
    return (<Router>     
            <section>
                <Header />
                <NavSetting />
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route exact path = '/login' component = {LogIn}></Route>
                    <Route exact path = '/signup' component = {Signup}></Route>
                    <Route exact path = '/create' component = {Create}></Route>
                    <Route exact path = '/edit' component = {Edit}></Route>
                    <Route path='/post/:id' component= {Post}></Route>
                </Switch>
            </section>
    </Router>)
}