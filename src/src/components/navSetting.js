import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';

class NavSetting extends Component {
    state = {
        showMenu: false
    }
    showMenu = ()  => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }
    render () {
        const {showMenu} = this.state
        const {userInfo = {}} = this.props
        const user = userInfo.name
        return <section className='nav-setting'>
            <div className='ui buttons'>
                <div className='ui floating dropdown button' onClick = {this.showMenu}>
                    <i className='icon bars'></i>
                    <div className='menu'>
                        {!!user && showMenu && <div>
                            <Link className='item' to=''>个人主页</Link>
                            <div className='divider'></div>
                            <Link className='item' to = '/post/create'>发表文章</Link>
                            <Link className='item' to='/signout'>登出</Link>
                        </div>}
                        {!user && showMenu && <div>
                            <Link className='item' to='/signin'>登录</Link>
                            <Link className='item' to='/signup'>注册</Link>
                        </div>}
                    </div>
                </div>
            </div>
        </section>
    }
}

const mapStatesToProps = states => ({...states.commonReducers})
export default connect(mapStatesToProps)(NavSetting)