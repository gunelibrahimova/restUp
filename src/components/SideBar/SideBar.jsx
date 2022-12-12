import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.scss'

const SideBar = () => {
    return (
        <div id='sideBar'>
            <ul>
                <li className='dashboard'>
                    <h2>Rest UP</h2>
                </li>
                <li className="product">
                    <Link to="/restaurants">Restaurants</Link>
                </li>
            </ul>
        </div>
    )
}

export default SideBar