import React, {Component} from 'react'
import { connect } from 'react-redux'
import {searchToQuery} from '../utils'
import * as postActions from '../actions/postActions'
import { message } from 'antd'

class Comments extends Component {
    state = {
        comment: ''
    }
    createComment () {
        const {comment} = this.state
        const {post = {}} = this.props
        const postId = post._id
        const {createComment} = this.props
        createComment({comment, postId}).then(res => message.success('留言成功'))
    }
    changeComment (e) {
        this.setState({comment: e.target.value})
    }
    deleteComment (id) {
        const {deleteComment} = this.props
        deleteComment(id).then(res => message.success('删除留言成功'))
    }
    render () {
        const {comments = [], userInfo = {}, post} = this.props
        const {comment = ''} = this.state
        const userId = userInfo._id
        return (
            <div className="ui grid">
                <div className="four wide column"></div>
                <div className="eight wide column">
                <div className="ui segment">
                    <div className="ui minimal comments">
                    <h3 className="ui dividing header">留言</h3>
            
                    {comments.map(comment => (
                        <div className="comment">
                        <span className="avatar">
                            <img src="" />
                        </span>
                        <div className="content">
                            <a className="author" href={`/posts?author=${userId}`}>{comment.author.name}</a>
                            <div className="metadata">
                            <span className="date">{comment.created_at}</span>
                            </div>
                            <div className="text">{comment.content}</div>
            
                            { userId && comment.author._id && userId.toString() === comment.author._id.toString() && <div className="actions">
                                <span className="reply" onClick={() => this.deleteComment(comment._id)}>删除</span>
                            </div>}
                        </div>
                        </div>
                    ))}
                   
                    {userId && <section className="ui reply form" method="post" action="/comments">
                        <input name="postId" value={post._id} hidden />
                        <div className="field">
                            <textarea name="content" value={comment} onChange={this.changeComment.bind(this)}></textarea>
                        </div>
                        <input type="submit" className="ui icon button" value="留言" onClick={this.createComment.bind(this)}/>
                    </section>}            
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = states => ({...states.commonReducers, ...states.postReducers})

export default connect(mapStateToProps, postActions)(Comments)