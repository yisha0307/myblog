import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default ()  => {
    return <section className='nav'>
        <div className = 'ui grid'>
            <div className='four wide column'></div>
            <div className='right wide column'>
                <Link to='/'>
                    <h1>Esha's Blog</h1>
                </Link>
                <p>Welcome</p>
            </div>
        </div>
    </section>
}