import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { injectIntl, FormattedMessage } from 'react-intl'
import { connect, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'

const Login = ({ login }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        const user = { email, password }
        e.preventDefault() // because this is submit
        login(user)
    }
    //Redirect if logged in
    const isAuthenticated = useSelector(state => state.rootReducer.auth.isAuthenticated)
    if (isAuthenticated) {
        return <Navigate to='/dashboard' />
    }
    return (
        <div className='container'>
            <h1 className='large text-primary'><FormattedMessage id='signin' /></h1>
            <p className='lead'><i className='fas fa-user header-icon'></i><FormattedMessage id='login.sign.into' /></p>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-text-border'
                        type='email'
                        placeholder='Email Address'
                        name='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-text-border'
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <input type='submit' className='btn btn-primary form-text-border' value='Login' />
            </form>
            <div className='flex-row-container'>
                <p className='my-1'>
                    <FormattedMessage id='dont.have.account' />
                </p>
                <Link to='/register'>
                    <div className='sign-button'>
                        <FormattedMessage id='signup' />
                    </div>
                </Link>
            </div>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired
}
export default injectIntl(connect(
    null // any state that you want to map ?
    , { login } // object with an action that we want to use
)(Login))

