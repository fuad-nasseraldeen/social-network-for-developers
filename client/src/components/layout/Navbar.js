import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { logout } from '../../actions/auth'

const Navbar = ({ logout }) => {
    const auth = useSelector((state) => state.rootReducer.auth)

    const authLinks = (
        <ul>
            <li>
                <Link to='/profiles'>Developers</Link>
            </li>
            <li>
                <Link to='/posts'>Posts</Link>
            </li>
            <li>
                <Link to='/dashboard'>
                    <i className='fas fa-user'></i>{' '}
                    <span className='hide-sm'>Dashboard</span>
                </Link>
            </li>
            <li>
                <Link onClick={logout} to='/'>
                    <i className='fas fa-sign-out-alt'></i>{' '}
                    <span className='hide-sm'>Logout</span>
                </Link>
            </li>
        </ul>
    )

    const guestLinks = (
        <ul>
            <li>
                <Link to='/profiles'>Developers</Link>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </ul>
    )
    return (
        <nav className='navbar bg-dark'>
            <h1>
                <Link to='/'>
                    {/* <i class='fa-sharp fa-solid fa-circle-nodes' /> */}
                    <i class='fa-solid fa-network-wired header-icon'></i>
                    Social Network
                </Link>
            </h1>
            {!auth.loading && (
                <Fragment>
                    {auth.isAuthenticated ? authLinks : guestLinks}
                </Fragment>
            )}
        </nav>
    )
}

export default connect(null, { logout })(Navbar)
