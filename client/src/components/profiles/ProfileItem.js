import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { injectIntl, FormattedMessage } from 'react-intl'
import * as _ from 'lodash'

const ProfileItem = ({ profile }) => {
    const { user, status, company, location, skills } = profile
    const { avatar, name } = user
    const skillsList = (skills) => {
        if (!_.isEmpty(skills) && skills.length > 0) {
            return skills.map((item, index) => {
                return (
                    skills[index] !== '' &&
                    index <= 9 && (
                        <li
                            key={index}
                            className='text-primary form-text-border skills-col'
                        >
                            <i className='fas fa-check header-icon'></i>
                            {skills[index]}
                        </li>
                    )
                )
            })
        }
    }

    return (
        <div className='profile bg-light form-text-border'>
            <img
                className={`${
                    name === 'Fuad Nasser-Aldeen'
                        ? 'round-img myProfile'
                        : 'round-img'
                }`}
                src={name !== 'Fuad Nasser-Aldeen' ? avatar : undefined}
                alt=''
            />
            <div>
                <h2>{name}</h2>
                <p>
                    {status} {company && <span> at {company}</span>}
                </p>
                <p className='my-1'>{location && <span>{location}</span>}</p>

                <Link
                    to={`/profile/${user?._id}`}
                    className='btn btn-primary form-text-border'
                >
                    <FormattedMessage id='view.profile' />
                </Link>
            </div>
            <ul className='skills-list'>{skillsList(skills)}</ul>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default injectIntl(ProfileItem)
