import React, {Component} from 'react'

export default class PostContent extends Component {
    render () {
        const {content} = this.props;
        return (
            <div className='post-content'>
            {content.title}
            </div>
        )
    }
}