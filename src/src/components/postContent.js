import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class PostContent extends Component {
    render () {
        const {post} = this.props;
        return (
            <div className='post-content'>
                <div className='ui grid'>
                    <div className='eight wide column'>
                        <div className='ui segment'>
                        <Link to=''><h3>{post.title}</h3></Link>
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