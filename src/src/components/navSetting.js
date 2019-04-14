import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class NavSetting extends Component {
    state = {}
    render () {
        return <section className='nav-setting'>
            <div className='ui buttons'>
                <div className='ui floating dropdown button'>
                    <i className='icon bars'></i>
                    <div className='menu'>
                        {!!user && <div>
                            <Link className='item' to=''>个人主页</Link>
                            <div className='divider'></div>
                            <Link className='item' to = '/post/create'>发表文章</Link>
                            <Link className='item' to='/signout'>登出</Link>
                        </div>}
                        {!user && <div>
                            <Link className='item' to='/signin'>登录</Link>
                            <Link className='item' to='/signup'>注册</Link>
                        </div>}
                    </div>
                </div>
            </div>
        </section>
    }
}