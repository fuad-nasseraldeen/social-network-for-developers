import React, { useEffect, Fragment } from 'react'
import { connect, useSelector } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { getCurrentProfile, deleteAccount } from '../../actions/profile'
import DashboardActions from './DashboardActions'
import Spinner from '../layout/Spinner'
import Experience from './Experience'
import Education from './Education'
import * as _ from 'lodash'

const Dashboard = ({ getCurrentProfile, deleteAccount }) => {
    const auth = useSelector(state => state.rootReducer.auth)
    const { profile, loading } = useSelector(state => state.rootReducer.profile)
    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile])
    return (
        _.isEmpty(profile) && !!loading ? (
            <div className='loading'>
                <Spinner />
            </div>
        ) : (
            <div className='container'>
                <Fragment>
                    <h1 className="large text-primary">Dashboard</h1>
                    <p className="lead">
                        <i className="fas fa-user header-icon"></i> Welcome {auth?.user && auth?.user?.name}
                    </p>
                </Fragment>
                {profile !== null ? (
                    <Fragment>
                        <DashboardActions />
                        <Experience experience={profile.experience} />
                        <Education education={profile.education} />

                        <div className='my-2'>
                            <button className='btn btn-danger form-text-border' onClick={() => deleteAccount()}>
                                <i className='fas fa-user-minus header-icon'></i>
                                <FormattedMessage id='delete.account' />
                            </button>
                        </div>
                    </Fragment>

                ) : (
                    <Fragment>
                        <p><FormattedMessage id='dashboard.setup' /></p>
                        <Link to='/create-profile' className='btn btn-primary my-1 form-text-border'><FormattedMessage id='dashboard.create.profile' /></Link>
                    </Fragment>
                )
                }
            </div>
        )
    )
}

export default injectIntl(connect(null, { getCurrentProfile, deleteAccount })(Dashboard))
