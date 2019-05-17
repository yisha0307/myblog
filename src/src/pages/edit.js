import React, {Component} from 'react'
import { connect } from 'react-redux';
import * as postActions from '../actions/postActions'
import { message } from 'antd';

class EditPage extends Component {
    state = {
        title: '',
        content: ''
    }
    componentDidMount () {
        // 获取原始的文章
        const postId = this.props.match.params.id
        const {getRawPost} = this.props
        getRawPost(postId).then(post => this.setState({
            title: post.title,
            content: post.content
        }))
    }
    submit () {
        const {title = '', content =''} = this.state
        const {updatePost, match, history} = this.props
        const postId = match.params.id
        if (!title) {
            message.info('请填写标题')
            return
        }
        if (!content) {
            message.info("请填写内容")
            return
        }
        updatePost({title, content, postId}).then(() => {
            message.success('更新成功')
            history.push(`/post/${postId}`)
        })
    }
    render () {
        const {userInfo = {}} = this.props
        const {title = '', content =''} = this.state
        return (
            <div className='ui grid'>
                <div className='four wide column'>
                    <a className='avatar'>
                        <img className='avatar' src={`/img/${userInfo.avatar}`} />
                    </a>
                </div>
                <div className='eight wide column'>
                    <section className='ui form segment' method='post' >
                        <div className='field required'>
                            <label>标题</label>
                            <input type='text' name='title' value={title} onChange={e => this.setState({title: e.target.value})}/>
                        </div>
                        <div className='field required'>
                            <label>内容</label>
                            <textarea name='content' rows='15' value={content} onChange = {e => this.setState({content: e.target.value})}></textarea>
                        </div>
                        <input type='submit' className='ui button' value='发布' onClick={this.submit.bind(this)} />
                    </section>
                </div>
            </div> 
        )
    }
}

const mapStateToProps = states => ({...states.commonReducers, ...states.postReducers})
export default connect(mapStateToProps, postActions)(EditPage)