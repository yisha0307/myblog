import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PostContent from '../components/postContent'
import {searchToQuery} from '../utils'
import * as commonActions from '../actions/commonAction'
import * as postActions from '../actions/postActions'
import { userInfo } from 'os';

class HomeIndex extends Component {
    componentDidMount () {
        const {location = {}} = this.props
        const authorId = searchToQuery(location.search || '').author || ''
        this.props.getUserInfo()
        this.props.getPostList(authorId)
    }

    render () {
        const {userInfo = {}, history} = this.props
        return (
            this.props.posts.map(p => <PostContent key={p._id} post={p} user={userInfo} history={history}/>)
        )
    }
}

const mapStatesToProps = states => ({...states.commonReducers, ...states.postReducers})
const mapDispatchToProps = ({...commonActions, ...postActions})

export default connect(mapStatesToProps, mapDispatchToProps)(HomeIndex)
