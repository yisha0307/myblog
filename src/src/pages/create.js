import React, {Component} from 'react'
import * as postActions from '../actions/postActions'
import { connect } from 'react-redux'

class CreatePostPage extends Component {
    state = {
        newTitle: '',
        newContent: ''
    }
    changeTitle = e => {
        this.setState({newTitle: e.target.value})
    }
    changeContent = e => {
        this.setState({newContent: e.target.value})
    }
    render () {
        const {newTitle, newContent} = this.state
        const {createNewPost} = this.props
        return (
            <section className="ui grid">
                <div className="four wide column">
                    <a className="avatar avatar-link">
                        <img className="avatar" src="" />
                    </a>
                </div>
            
                <div className="eight wide column">
                    <form className="ui form segment">
                        <div className="field required">
                        <label>标题</label>
                        <input type="text" name="title" value={newTitle} onChange={this.changeTitle}/>
                        </div>
                        <div className="field required">
                        <label>内容</label>
                        <textarea name="content" rows="15" value={newContent} onChange={this.changeContent}></textarea>
                        </div>
                        <input type="submit" className="ui button" value="发布" onClick={()=>createNewPost({title: newTitle, content: newContent})}/>
                    </form>                
                </div>
            </section>
        )
    }
}
const mapStatesToProps = states => ({...states.commonReducers, ...states.postReducers})

export default connect(mapStatesToProps, postActions)(CreatePostPage)