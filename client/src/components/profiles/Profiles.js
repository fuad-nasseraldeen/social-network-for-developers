import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import { getProfiles } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'
import * as _ from 'lodash'

const Profiles = ({ getProfiles }) => {
    const { profiles, loading } = useSelector(state => state.rootReducer.profile)
    useEffect(() => {
        getProfiles()
    }, [getProfiles])
    return (
        <Fragment>
            <div className='container'>
                {loading ? <Spinner />
                    : (
                        <Fragment>
                            <h1 className='large text-primary'><FormattedMessage id='developers' /></h1>
                            <p className='lead'>
                                <i className='fab fa-connectdevelop header-icon'></i>
                                <FormattedMessage id='connect.with.developers' />
                            </p>
                            <div className='profiles'>
                                {!_.isEmpty(profiles) ? (
                                    profiles.map(profile => {
                                        return <ProfileItem key={profile._id} profile={profile} />
                                    })
                                ) : (
                                    <h4> <FormattedMessage id='no.profiles' /></h4>
                                )}
                            </div>
                        </Fragment>
                    )}
            </div>
        </Fragment>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
}

export default injectIntl(connect(null, { getProfiles })(Profiles))

