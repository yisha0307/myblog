import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import _ from 'lodash'

export default class PostContent extends Component {
    render () {
        const {post = {}} = this.props
        const genderMap = {m:'男', f:'女', x: '保密'}
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

                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}