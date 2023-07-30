import React, { useState } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Link, Navigate } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import PropTypes from 'prop-types'

const Register = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const { name, email, password, password2 } = formData

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault() // because this is submit
        if (password !== password2) {
            props.setAlert("Passwords does'nt match", 'danger')
        } else {
            const user = { name, email, password }
            props.register(user)
        }
    }
    //Redirect if logged in
    const isAuthenticated = useSelector(state => state.rootReducer.auth.isAuthenticated)
    if (isAuthenticated) {
        return <Navigate to='/dashboard' />
    }
    return (
        <div className='container'>
            <h1 className='large text-primary'><FormattedMessage id='signup' /></h1>
            <p className='lead'><i className='fas fa-user header-icon'></i><FormattedMessage id='register.create.account' /></p>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-text-border'
                        type='text'
                        placeholder='Name'
                        name='name'
                        value={name}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-text-border'
                        type='email'
                        placeholder='Email Address'
                        name='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                    />
                    <small className='form-text'><FormattedMessage id='register.gravator.profile.image' /></small>
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
                <div className='form-group'>
                    <input
                        className='form-text-border'
                        type='password'
                        placeholder='Confirm Password'
                        name='password2'
                        value={password2}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <input type='submit' className='btn btn-primary form-text-border' value='Register' />
            </form>
            <div className='flex-row-container'>
                <p className='my-1'>
                    <FormattedMessage id='register.already.has.account' />
                </p>
                <Link to='/login'>
                    <div className='sign-button'>
                        <FormattedMessage id='signin' />
                    </div>
                </Link>
            </div>
        </div>
    )
}
Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
}
export default injectIntl(connect(
    null // any state that you want to map ?
    , { setAlert, register } // object with an action that we want to use
)(Register))
