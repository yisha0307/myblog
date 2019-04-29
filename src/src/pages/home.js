import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PostContent from '../components/postContent'

import * as commonActions from '../actions/commonAction'
import * as postActions from '../actions/postActions'

class HomeIndex extends Component {
    componentDidMount () {
        this.props.getUserInfo()
        this.props.getPostList()
    }

    render () {
        return (
            this.props.posts.map(p => <PostContent key={p._id} post={p}/>)
        )
    }
}

const mapStatesToProps = states => ({...states.commonReducers, ...states.postReducers})
const mapDispatchToProps = ({...commonActions, ...postActions})

export default connect(mapStatesToProps, mapDispatchToProps)(HomeIndex)
