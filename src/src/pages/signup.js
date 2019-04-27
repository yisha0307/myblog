import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as commonActions from '../actions/commonAction'

class SignupPage extends Component {
    state = {}

    render () {
        return (
            <div className='ui grid'>
                <div className='four wide column'></div>
                <div className='eight wide column'>
                    <form className='ui form segment'>
                        <div className='field required'>
                            <label>用户名</label>
                            <input placeholder="用户名" type='text' name='name' />
                        </div>
                        <div className='field required'>
                            <label>密码</label>
                            <input placeholder="密码" type='password' name='password' />
                        </div>
                        <div className='field required'>
                            <label>重复密码</label>
                            <input placeholder="重复密码" type='password' name='repassword' />
                        </div>
                        <div className='field required'>
                            <label>性别</label>
                            <select className='ui compact selection dropdown' name='gender'>
                                <option value='m'>男</option>
                                <option value='f'>女</option>
                                <option value='x'>保密</option>
                            </select>
                        </div>
                        <div className='field required'>
                            <label>头像</label>
                            <input type='file' name='avatar'/>
                        </div>
                        <div className='field required'>
                            <label>个人简介</label>
                            <textarea name='bio' rows='5'></textarea>
                        </div>
                        <input type='submit' className='ui button fluid' value='注册' />
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (commonActions)
export default connect(null, mapDispatchToProps)(SignupPage)