import React, {Component} from 'react'

export default class CreatePostPage extends Component {
    render () {
        return (
            <section className="ui grid">
                <div className="four wide column">
                    <a className="avatar avatar-link">
                        <img className="avatar" src="" />
                    </a>
                </div>
            
                <div className="eight wide column">
                    <form className="ui form segment" method="post">
                        <div className="field required">
                        <label>标题</label>
                        <input type="text" name="title"/>
                        </div>
                        <div className="field required">
                        <label>内容</label>
                        <textarea name="content" rows="15"></textarea>
                        </div>
                        <input type="submit" className="ui button" value="发布"/>
                    </form>                
                </div>
            </section>
        )
    }
}