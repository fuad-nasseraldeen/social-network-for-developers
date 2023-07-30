import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { injectIntl, FormattedMessage } from 'react-intl'
const ProfileExperience = ({
    experience: {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }
}) => {

    return (
        <Fragment>
            <div>
                <h3 className="text-dark">{company}</h3>
                <p>
                    <Moment format='YYYY/MM/DD'>{from}</Moment> - {current ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
                </p>
                <p><strong><FormattedMessage id='experience.position' /></strong>{title}</p>
                <p><strong><FormattedMessage id='experience.location' /></strong>{location}</p>
                <p><strong><FormattedMessage id='experience.description' /></strong>{description}</p>
            </div>
        </Fragment>
    )
}

ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired,
}

export default injectIntl(ProfileExperience)

