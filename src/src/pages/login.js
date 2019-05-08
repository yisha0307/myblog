import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as commonActions from '../actions/commonAction'
import ajax from '../tools/ajax'
import sha1 from 'sha1'

class LogInPage extends Component {
    state = {
        name: '',
        password: ''
    }
    changeName = e => {
       this.setState({name: e.target.value})
    }
    changePassword = e => {
        this.setState({password: e.target.value})
    }
    login = ({name, password}) => {
        // const {history} = this.props
        // history.push('/')
        const {history} = this.props
        ajax.post('/signin', {name, password}).then(res => {
            history.push('/')
        })
    }
    render () {
        const {name, password} = this.state
        return <div className='ui grid'>
        <div className='four wide column'></div>
        <div className='eight wide column'>
            <section className='ui form segment'>
                <div className='field required'>
                    <label>用户名</label>
                    <input placeholder="用户名" type='text' name='name' value={name} onChange={this.changeName}/>
                </div>
                <div className='field required'>
                    <label>密码</label>
                    <input placeholder="密码" type='password' name='password' value={password} onChange={this.changePassword}/>
                </div>
                <input type='submit' className='ui button fluid' value='登录' onClick={() => this.login({name, password})}/>
            </section>
        </div>
    </div>
    }
}

const mapStateToProps = states => states.commonReducers

export default connect(mapStateToProps, commonActions)(LogInPage)