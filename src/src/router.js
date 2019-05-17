// 定义前端路由表
import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/home'
import LogIn from './pages/login'
import Signup from './pages/signup'
import Create from './pages/create'
import Edit from './pages/edit'
import Post from './pages/post'
import ErrPage from './pages/404'
import 'antd/dist/antd.css'

export default () => {
    return (<Router>     
            <section>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route exact path='/posts' component={Home}></Route>
                    <Route exact path = '/login' component = {LogIn}></Route>
                    <Route exact path = '/signup' component = {Signup}></Route>
                    <Route exact path = '/create' component = {Create}></Route>
                    <Route exact path = '/edit/:id' component = {Edit}></Route>
                    <Route path='/post/:id' component= {Post}></Route>
                    <Route path='/404' component={ErrPage}></Route>
                    <Route component={ErrPage}></Route>
                </Switch>
            </section>
    </Router>)
}