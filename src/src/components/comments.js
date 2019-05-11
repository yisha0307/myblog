import React, {Component} from 'react'
import post from '../pages/post';
import { connect } from 'react-redux'
import * as postActions from '../actions/postActions'
class Comments extends Component {
    render () {
        const {comments = [], userInfo = {}, post} = this.props
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
                                <a className="reply" href={`/comments/${comment._id}/remove`}>删除</a>
                            </div>}
                        </div>
                        </div>
                    ))}
                   
                    {userId && <section className="ui reply form" method="post" action="/comments">
                        <input name="postId" value={post._id} hidden />
                        <div className="field">
                            <textarea name="content"></textarea>
                        </div>
                        <input type="submit" className="ui icon button" value="留言" />
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