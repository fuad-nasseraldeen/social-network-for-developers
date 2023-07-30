import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { injectIntl, FormattedMessage } from 'react-intl'
const ProfileEducation = ({
    education: {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
    }
}) => {

    return (
        <Fragment>
            <div>
                <h3 className="text-dark">{school}</h3>
                <p>
                    <Moment format='YYYY/MM/DD'>{from}</Moment> - {current ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
                </p>
                <p><strong><FormattedMessage id='education.degree' /></strong>{degree}</p>
                <p>
                    <strong><FormattedMessage id='education.fieldofstudy' /></strong>
                    {fieldofstudy}
                </p>
                <p>
                    <strong><FormattedMessage id='experience.description' /></strong>
                    {description}
                </p>
            </div>
        </Fragment>
    )
}

ProfileEducation.propTypes = {
    education: PropTypes.object.isRequired,
}

export default injectIntl(ProfileEducation)

