import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import postService from '../service/postService'
import PostContent from '../components/postContent'

import commonActions from '../actions/commonAction'
import postActions from '../actions/postActions'

class HomeIndex extends Component {
    componentDidMount () {
        this.props.getUserInfo()
        this.props.getPostList()
    }

    render () {
        console.log(this.props)
        return (
            this.props.posts.map(p => <PostContent key={p._id} post={p}/>)
        )
    }
}

const mapStatesToProps = states => ({...states.commonReducers, ...states.postReducers})
const mapDispatchToProps = dispatch => ({
    getUserInfo: () => dispatch(commonActions.getUserInfo()),
    getPostList: () => dispatch(postActions.getPostList())
})

export default connect(mapStatesToProps, mapDispatchToProps)(HomeIndex)
