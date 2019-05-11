import React, {Component} from 'react'
import * as postActions from '../actions/postActions'
import { connect } from 'react-redux';
import _ from 'lodash'
import Comments from '../components/comments'

class PostDetail extends Component {
    componentWillMount () {
        const id = this.props.match.params.id
        this.getPostDetail(id)
    }
    getPostDetail (id) {
        this.props.getPostDetail(id)
    }
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
                        <h3>{post.title}</h3>
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
                <Comments post = {post} />
            </div>
        )
    }
}

const mapStateToProps = states => states.postReducers
const mapDispatchToProps = postActions

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)