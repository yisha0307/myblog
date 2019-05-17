import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as postActions from '../actions/postActions'
import _ from 'lodash'
import { connect } from 'react-redux'

class PostContent extends Component {
    updatePost () {
        const {updatePost} = this.props
        updatePost().then()
    }
    render () {
        const {post = {}, user, deletePost, history} = this.props
        const genderMap = {m:'男', f:'女', x: '保密'}
        const showMenu = user && post.author._id && user._id.toString()=== post.author._id.toString()
        return (
            <div className='post-content'>
                <div className='ui grid'>
                    <div className='four wide column'>
                        <a className='avatar avatar-link' href={`/posts?author=${_.get(post, 'author._id')}`}
                            data-title = {`${_.get(post, 'author.name') } | ${genderMap[_.get(post, 'author.gender' )]}`}
                            data-content = {`${_.get(post, 'author.bio')}`}>
                            <img className='avatar' src={`/img/${_.get(post, 'author.avatar')}`} />
                        </a>
                    </div>
                    <div className='eight wide column'>
                        <div className='ui segment'>
                        <Link to={`/post/${post._id}`}><h3>{post.title}</h3></Link>
                        <pre>{post.content}</pre>
                        </div>
                        <div>
                            <span className='tag'>{post.created_at}</span>
                            <span className='tag right'>
                                <span>{`浏览(${post.pv || 0})`}</span>
                                <span>{`留言(${post.commentsCount || 0})`}</span>
                                   {showMenu &&  <div className='ui inline dropdown'>
                                        <div className='text'></div>
                                        <i className='dropdown icon'></i>
                                        <div className='menu'>
                                            <div className='item' onClick={() => history.push(`/edit/${post._id}`)}>编辑</div>
                                            <div className='item' onClick={() => deletePost(post._id)}>删除</div>
                                        </div>
                                    </div>}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = states => (states.commonReducers)
export default connect(mapStateToProps, postActions)(PostContent)