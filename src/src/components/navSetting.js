import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import styled from 'styled-components'
import ajax from '../tools/ajax'
import { message } from 'antd';
import { withRouter } from 'react-router-dom'
import * as commonActions from '../actions/commonAction'

const NavMenu = styled.div`
    padding: 10px 5px !important;
    .div-item{
        color: #1890ff;
        display: block;
        padding: 5px;
    }
    .div-item:hover {
        cursor: pointer;
        border-bottom: 3px solid #4fc08d;
    }
`;
class NavSetting extends Component {
    state = {
        showMenu: false
    }
    showMenu = ()  => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }
    logout = () => {
        const {history, clearUserInfo} = this.props
        ajax.get('/signout').then(res => {
            if (res.retCode === '000000') {
                clearUserInfo()
                history.push('/login')
            } else {
                message.error('登出失败')
            }
        })
    }
    toHomePage = () => {
        const {history, userInfo = {}} = this.props
        history.push('posts?author=' + userInfo._id)
    }
    render () {
        const {showMenu} = this.state
        const {userInfo = {}} = this.props
        const user = userInfo.name
        return <section className='nav-setting'>
            <div className='ui buttons'>
                <div className='ui floating dropdown button' onClick = {this.showMenu}>
                    <i className='icon bars'></i>
                    {showMenu && <NavMenu className='menu'>
                        {!!user && showMenu && <div>
                            <Link className='div-item' to={'/posts?author=' + userInfo._id}>个人主页</Link>
                            <Link className='div-item' to = '/post/create'>发表文章</Link>
                            <div className='div-item' onClick={this.logout}>登出</div>
                        </div>}
                        {!user && showMenu && <div>
                            <Link className='div-item' to='/login'>登录</Link>
                            <div className='div-item' to='/signup'>注册</div>
                        </div>}
                    </NavMenu>}
                </div>
            </div>
        </section>
    }
}

const mapStatesToProps = states => ({...states.commonReducers})
export default withRouter(connect(mapStatesToProps, commonActions)(NavSetting))