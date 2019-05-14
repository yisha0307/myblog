import React, {Component} from 'react'
import * as postActions from '../actions/postActions'
import * as commonActions from '../actions/commonAction'
import { connect } from 'react-redux'
import { message } from 'antd';

class CreatePostPage extends Component {
    state = {
        newTitle: '',
        newContent: ''
    }
    componentDidMount () {
        const {getUserInfo} = this.props
        getUserInfo()
    }
    changeTitle = e => {
        this.setState({newTitle: e.target.value})
    }
    changeContent = e => {
        this.setState({newContent: e.target.value})
    }
    createNewPost () {
        const {createNewPost, history, userInfo={}} = this.props
        const {newTitle, newContent} = this.state
        if (!newTitle) {
            message.error('请输入标题')
            return
        }
        if (!newContent) {
            message.error('请输入文章内容')
            return
        }
        createNewPost({title: newTitle, content: newContent}).then(res => {        
            message.success('发表成功')
            history.push(`/posts?author=${userInfo._id}`)
        })
    }
    render () {
        const {newTitle, newContent} = this.state
        const {userInfo = {}} = this.props
        return (
            <section className="ui grid">
                <div className="four wide column">
                    <a className="avatar avatar-link">
                        <img className="avatar" src={`/img/${userInfo.avatar}`} />
                    </a>
                </div>
            
                <div className="eight wide column">
                    <section className="ui form segment">
                        <div className="field required">
                        <label>标题</label>
                        <input type="text" name="title" value={newTitle} onChange={this.changeTitle}/>
                        </div>
                        <div className="field required">
                        <label>内容</label>
                        <textarea name="content" rows="15" value={newContent} onChange={this.changeContent}></textarea>
                        </div>
                        <input type="submit" className="ui button" value="发布" onClick={()=> this.createNewPost()}/>
                    </section>                
                </div>
            </section>
        )
    }
}
const mapStatesToProps = states => ({...states.commonReducers, ...states.postReducers})
const mapDispatchToActions = {
    ...commonActions,
    ...postActions
}
export default connect(mapStatesToProps, mapDispatchToActions)(CreatePostPage)