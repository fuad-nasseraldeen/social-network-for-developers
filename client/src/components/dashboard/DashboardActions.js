import React from 'react'
import { Link } from 'react-router-dom'
import { injectIntl, FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import ImageUpload from '../layout/ImageUpload'
const DashboardActions = () => {
    return (
        <div className="dash-buttons">
            <Link to="/edit-profile" className="btn btn-light form-text-border">
                <i className="fas fa-user-circle text-primary"></i>
                <FormattedMessage id="dashboard.edit.profile" />
            </Link>
            <Link
                to="/add-experience"
                className="btn btn-light form-text-border"
            >
                <i className="fab fa-black-tie text-primary"></i>
                <FormattedMessage id="dashboard.add.experience" />
            </Link>
            <Link
                to="/add-education"
                className="btn btn-light form-text-border"
            >
                <i className="fas fa-graduation-cap text-primary"></i>
                <FormattedMessage id="dashboard.add.education" />
            </Link>
            {/* <ImageUpload center imageId="image" /> */}
        </div>
    )
}
export default injectIntl(connect(null)(DashboardActions))
