import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import postService from '../service/postService'
import PostContent from '../components/postContent'

export default class HomeIndex extends Component {
    state = {
        posts: []
    }
    componentDidMount () {
      this.getPostList()
    }

    getPostList = async () => {
        const posts = await postService.getAllPosts()
        this.setState({
            posts
        })
    }
    render () {
        const {posts} = this.state
        console.log(posts)
        return (
            posts.map(p => <PostContent content={p}/>)
        )
    }
}