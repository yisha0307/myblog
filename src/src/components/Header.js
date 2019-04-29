import React from 'react'
import {Link} from 'react-router-dom'
import NavSetting from '../components/navSetting'

export default ()  => {
    return <section>
        <section className='nav'>
            <div className = 'ui grid'>
                <div className='four wide column'></div>
                {/* <div className='right wide column'> */}
                    <Link to='/'>
                        <h1>sss Blog</h1>
                    </Link>
                    {/* <p>Welcome</p> */}
                </div>
            {/* </div> */}
        </section>
        <NavSetting />
    </section>
}