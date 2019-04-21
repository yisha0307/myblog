import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as commonActions from '../actions/commonAction'

class LogInPage extends Component {
    render () {
        const {login} = this.props
        console.log(this.props)
        return <div className='ui grid'>
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
                <input type='submit' className='ui button fluid' value='登录' onClick={login}/>
            </form>
        </div>
    </div>
    }
}

const mapStateToProps = states => states.commonReducers

export default connect(mapStateToProps, commonActions)(LogInPage)