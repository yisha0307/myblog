import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as commonActions from '../actions/commonAction'
import {Upload, message, Button, Icon} from 'antd'

class SignupPage extends Component {
    state = {
        name: '',
        password: '',
        repassword: '',
        gender: 'x',
        avatar: '',
        bio: ''
    }
    beforeUpload (file) {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    } 
    submit () {
        const {name, password, repassword, gender, avatar, bio} = this.state
        let errMessage = ''
        if (!name) {
            errMessage = '请输入姓名'
        } else if (!password) {
            errMessage = '请输入密码'
        } else if (!repassword) {
            errMessage = '请再次输入密码'
        } else if (!gender) {
            errMessage = '请选择性别'
        } else if (!avatar) {
            errMessage = '请上传头像'
        }
        if (!!errMessage) {
            return message.info(errMessage)
        }
        this.props.signup({
            name,
            password,
            repassword,
            avatar,
            gender,
            bio
        })
    }
    render () {
        const {name, password, repassword, bio, avatar, gender} = this.state
        const imgprops = {
            name: 'file',
            action: '/user/uploadImg',
            headers: {
              authorization: 'authorization-text',
            },
            accept: 'image/*',
            onChange(info) {
              if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            },
          };
        return (
            <div className='ui grid'>
                <div className='four wide column'></div>
                <div className='eight wide column'>
                    <section className='ui form segment'>
                        <div className='field required'>
                            <label>用户名</label>
                            <input placeholder="用户名" type='text' name='name' value={name} onChange={e => this.setState({name: e.target.value})}/>
                        </div>
                        <div className='field required'>
                            <label>密码</label>
                            <input placeholder="密码" type='password' name='password' value={password} onChange = {e => this.setState({password: e.target.value})}/>
                        </div>
                        <div className='field required'>
                            <label>重复密码</label>
                            <input placeholder="重复密码" type='password' name='repassword' value={repassword} onChange = {e => this.setState({repassword: e.target.value})}/>
                        </div>
                        <div className='field required'>
                            <label>性别</label>
                            <select className='ui compact selection dropdown' name='gender' value={gender} onChange = {e=> this.setState({gender: e.target.value})}>
                                <option value='m'>男</option>
                                <option value='f'>女</option>
                                <option value='x'>保密</option>
                            </select>
                        </div>
                        <div className='field required'>
                        <label>用户头像</label>
                            <Upload {...imgprops}>
                                <Button>
                                <Icon type="upload" /> Upload
                                </Button>
                            </Upload>
                        </div>
                        <div className='field required'>
                            <label>个人简介</label>
                            <textarea name='bio' rows='5' value={bio} onChange = { e => this.setState(e.target.value) }></textarea>
                        </div>
                        <button className='ui button fluid' onClick={this.submit.bind(this)}>注册</button>
                    </section>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (commonActions)
export default connect(null, mapDispatchToProps)(SignupPage)