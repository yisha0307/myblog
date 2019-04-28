import React, {Component} from 'react'
import * as postActions from '../actions/postActions'
import { connect } from 'react-redux';

class PostDetail extends Component {
    componentDidMount () {
        const id = this.props.match.params.id
        this.getPostDetail(id)
    }
    getPostDetail (id) {
        this.props.getPostDetail(id)
    }
    render () {
        const {post = {}} = this.props;
        console.log(this.props)
        return (
            <div className='post-content'>
                <div className='ui grid'>
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
            </div>
        )
    }
}

const mapStateToProps = states => states.postReducers
const mapDispatchToProps = postActions

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)