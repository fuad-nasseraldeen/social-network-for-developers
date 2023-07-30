import React, { Fragment, useEffect, useState } from 'react'
import Spinner from '../layout/Spinner'
import { connect, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { injectIntl, FormattedMessage } from 'react-intl'
import { addEducation } from '../../actions/profile'

const AddEducation = ({ addEducation }) => {
    const navigate = useNavigate()
    const { loading } = useSelector(state => state.rootReducer.profile)
    const [isLoading, toggleIsLoading] = useState(false)
    const [toDateDisabled, toggleToDateDisabled] = useState(false)

    useEffect(() => {
        toggleIsLoading(loading)
    }, [loading])
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: '',
    })

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
    } = formData

    const onChange = e => (setFormData({ ...formData, [e.target.name]: e.target.value }))

    const onSubmit = e => {
        window.scrollTo(0, 0)
        e.preventDefault()
        addEducation(formData, navigate)
    }
    const onChangeCurrent = e => {
        setFormData({ ...formData, current: !current })
        toggleToDateDisabled(!toDateDisabled)
    }
    return (
        <Fragment>
            {isLoading && <Spinner />}

            <div className='container'>
                <h1 className='large text-primary'><FormattedMessage id='education.addEducation' /></h1>
                <p className='lead'>
                    <i className='fas fa-code-branch header-icon'></i> <FormattedMessage id='education.title' />
                </p>
                <small className='required'>{<FormattedMessage id='profile.required' />}</small>
                <form className='form' onSubmit={e => onSubmit(e)}>
                    <div className='form-group'>
                        <input className='form-text-border' type='text' placeholder='* School or Bootcamp' name='school' value={school} onChange={e => onChange(e)} required />
                    </div>
                    <div className='form-group'>
                        <input className='form-text-border' type='text' placeholder='* Degree or Certificate' name='degree' value={degree} onChange={e => onChange(e)} required />
                    </div>
                    <div className='form-group'>
                        <input className='form-text-border' type='text' placeholder='Field Of Study' name='fieldofstudy' value={fieldofstudy} onChange={e => onChange(e)} />
                    </div>
                    <div className='form-group'>
                        <h4>{<FormattedMessage id='experience.fromDate' />}</h4>
                        <input className='form-text-border' type='date' name='from' value={from} onChange={e => onChange(e)} />
                    </div>
                    <div className='form-group'>
                        <p><input className='form-text-border' type='checkbox' checked={current} name='current' value='current' onChange={e => onChangeCurrent(e)} /> {<FormattedMessage id='experience.current.job' />}</p>
                    </div>
                    {!toDateDisabled && <div className='form-group'>
                        <h4>{<FormattedMessage id='experience.toDate' />}</h4>
                        <input className='form-text-border' type='date' name='to' value={to} onChange={e => onChange(e)} />
                    </div>}
                    <div className='form-group'>
                        <textarea
                            className='form-text-border'
                            name='description'
                            cols='30'
                            rows='5'
                            placeholder='Program Description'
                            value={description}
                            onChange={e => onChange(e)}
                        ></textarea>
                    </div>
                    <input type='submit' className='btn btn-primary my-1 form-text-border' />
                    <Link to={'/dashboard'} className='btn btn-light my-1 form-text-border'>{<FormattedMessage id='goBack' />}</Link>
                </form>
            </div>
        </Fragment>
    )
}

export default injectIntl(connect(null, { addEducation })(AddEducation))

