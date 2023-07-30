import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { injectIntl, FormattedMessage } from 'react-intl'
import { createProfile } from '../../actions/profile'
import Spinner from '../layout/Spinner'

const CreateProfile = ({ createProfile }) => {
    const navigate = useNavigate()
    const { loading } = useSelector(state => state.rootReducer.profile)
    const [displaySocialInputs, toggleSocialInputs] = useState(false)
    const [isLoading, toggleIsLoading] = useState(false)

    useEffect(() => {
        toggleIsLoading(loading)
    }, [loading])
    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        bio: '',
        githubusername: '',
        youtube: '',
        github: '',
        facebook: '',
        linkedin: '',
        instagram: '',
    })

    const {
        company,
        website,
        location,
        status,
        skills,
        bio,
        githubusername,
        youtube,
        github,
        facebook,
        linkedin,
        instagram
    } = formData

    const onChange = e => (setFormData({ ...formData, [e.target.name]: e.target.value }))

    const onSubmit = e => {
        window.scrollTo(0, 0)
        // toggleIsLoading(!isLoading)
        e.preventDefault()
        createProfile(formData, navigate)
    }
    return (
        <Fragment>
            {isLoading && <Spinner />}

            <div className='container'>
                <h1 className='large text-primary'>{<FormattedMessage id='profile.create.your.own' />}</h1>
                <p className='lead'>
                    <i className='fas fa-user header-icon'></i>{<FormattedMessage id='profile.information' />}</p>
                <small className='required'>{<FormattedMessage id='profile.required' />}</small>
                <form className='form' onSubmit={e => onSubmit(e)}>
                    <div className='form-group'>
                        <select className='form-text-border' name='status' value={status} onChange={e => onChange(e)}>
                            <option value='0'>* Select Professional Status</option>
                            <option value='Developer'>Developer</option>
                            <option value='Junior Developer'>Junior Developer</option>
                            <option value='Senior Developer'>Senior Developer</option>
                            <option value='Manager'>Manager</option>
                            <option value='Student or Learning'>Student or Learning</option>
                            <option value='Instructor'>Instructor or Teacher</option>
                            <option value='Intern'>Intern</option>
                            <option value='Other'>Other</option>
                        </select>
                        <small className='form-text'>{<FormattedMessage id='profile.giveUS.idea' />}</small>
                    </div>
                    <div className='form-group'>
                        <input className='form-text-border' type='text' placeholder='Company' name='company' value={company} onChange={e => onChange(e)} />
                        <small className='form-text'>{<FormattedMessage id='profile.work' />}</small>
                    </div>
                    <div className='form-group'>
                        <input className='form-text-border' type='text' placeholder='Website' name='website' value={website} onChange={e => onChange(e)} />
                        <small className='form-text'>{<FormattedMessage id='profile.website' />}</small>
                    </div>
                    <div className='form-group'>
                        <input className='form-text-border' type='text' placeholder='Location' name='location' value={location} onChange={e => onChange(e)} />
                        <small className='form-text'>{<FormattedMessage id='profile.location' />}</small>
                    </div>
                    <div className='form-group'>
                        <input className='form-text-border' type='text' placeholder='* Skills' name='skills' value={skills} onChange={e => onChange(e)} />
                        <small className='form-text'>{<FormattedMessage id='profile.skills' />}</small>
                    </div>
                    <div className='form-group'>
                        <input
                            className='form-text-border'
                            type='text'
                            placeholder='Github Username'
                            name='githubusername'
                            value={githubusername} onChange={e => onChange(e)}
                        />
                        <small className='form-text'>{<FormattedMessage id='profile.repos' />}</small>
                    </div>
                    <div className='form-group'>
                        <textarea className='form-text-border' placeholder='A short bio of yourself' name='bio' value={bio} onChange={e => onChange(e)}></textarea>
                        <small className='form-text'>{<FormattedMessage id='profile.bio' />}</small>
                    </div>

                    <div className='my-2'>
                        <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type='button' className='btn btn-light form-text-border'>
                            {<FormattedMessage id='profile.social.network' />}
                        </button>
                        <span>{<FormattedMessage id='profile.optional' />}</span>
                    </div>

                    {displaySocialInputs && <Fragment>
                        <div className='form-group social-input'>
                            <i className='fab fa-github fa-2x'></i>
                            <input className='form-text-border' type='text' placeholder='Github URL' name='github' value={github} onChange={e => onChange(e)} />
                        </div>

                        <div className='form-group social-input'>
                            <i className='fab fa-facebook fa-2x'></i>
                            <input className='form-text-border' type='text' placeholder='Facebook URL' name='facebook' value={facebook} onChange={e => onChange(e)} />
                        </div>

                        <div className='form-group social-input'>
                            <i className='fab fa-youtube fa-2x'></i>
                            <input className='form-text-border' type='text' placeholder='YouTube URL' name='youtube' value={youtube} onChange={e => onChange(e)} />
                        </div>

                        <div className='form-group social-input'>
                            <i className='fab fa-linkedin fa-2x'></i>
                            <input className='form-text-border' type='text' placeholder='Linkedin URL' name='linkedin' value={linkedin} onChange={e => onChange(e)} />
                        </div>

                        <div className='form-group social-input'>
                            <i className='fab fa-instagram fa-2x'></i>
                            <input className='form-text-border' type='text' placeholder='Instagram URL' name='instagram' value={instagram} onChange={e => onChange(e)} />
                        </div>
                    </Fragment>}
                    <input type='submit' className='btn btn-primary my-1 form-text-border' />
                    <Link to={'/dashboard'} className='btn btn-light my-1 form-text-border'>{<FormattedMessage id='goBack' />}</Link>
                </form>
            </div>
        </Fragment>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
}

export default injectIntl(connect(null, { createProfile })(CreateProfile))

