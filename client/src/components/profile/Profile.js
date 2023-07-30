import React, { Fragment, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { injectIntl, FormattedMessage } from 'react-intl'
import { connect, useSelector } from 'react-redux'
import { getProfileByID } from '../../actions/profile'
import ProfileTop from './ProfileTop'
import Spinner from '../layout/Spinner'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'
import * as _ from 'lodash'
function Profile({ getProfileByID }) {
    const auth = useSelector((state) => state.rootReducer.auth)
    const { id } = useParams()
    const { profile, loading } = useSelector(
        (state) => state.rootReducer.profile
    )
    useEffect(() => {
        getProfileByID(id)
    }, [profile, getProfileByID, id, loading])

    return (
        <Fragment>
            {profile === null ? (
                <Spinner />
            ) : (
                <div className='container'>
                    <Link
                        to='/profiles'
                        className='btn btn-light form-text-border'
                    >
                        <FormattedMessage id='back.to.profile' />
                    </Link>
                    {auth.isAuthenticated &&
                        auth.loading === false &&
                        auth.user._id === profile.user._id && (
                            <Link
                                to='/edit-profile'
                                className='btn btn-dark form-text-border'
                            >
                                <FormattedMessage id='dashboard.edit.profile' />
                            </Link>
                        )}

                    {
                        <div className='profile-grid my-1'>
                            <ProfileTop profile={profile} />
                            <ProfileAbout profile={profile} />

                            <div className='profile-exp bg-white p-2 form-text-border'>
                                <h2 className='text-primary'>
                                    <FormattedMessage id='experience' />
                                </h2>
                                {!_.isEmpty(profile.experience) ? (
                                    <Fragment>
                                        {profile.experience.map(
                                            (experience) => {
                                                return (
                                                    <ProfileExperience
                                                        key={experience._id}
                                                        experience={experience}
                                                    />
                                                )
                                            }
                                        )}
                                    </Fragment>
                                ) : (
                                    <h4>
                                        {' '}
                                        <FormattedMessage id='no.experience' />
                                    </h4>
                                )}
                            </div>

                            <div className='profile-edu bg-white p-2 form-text-border'>
                                <h2 className='text-primary'>
                                    <FormattedMessage id='education' />
                                </h2>
                                {!_.isEmpty(profile.education) ? (
                                    <Fragment>
                                        {profile.education.map((education) => {
                                            return (
                                                <ProfileEducation
                                                    key={education._id}
                                                    education={education}
                                                />
                                            )
                                        })}
                                    </Fragment>
                                ) : (
                                    <h4>
                                        {' '}
                                        <FormattedMessage id='no.education' />
                                    </h4>
                                )}
                            </div>

                            {profile.githubusername && (
                                <ProfileGithub
                                    username={profile.githubusername}
                                />
                            )}
                        </div>
                    }
                </div>
            )}
        </Fragment>
    )
}

export default injectIntl(connect(null, { getProfileByID })(Profile))
