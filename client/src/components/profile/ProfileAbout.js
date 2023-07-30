import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import * as _ from 'lodash'
const ProfileAbout = ({
    profile: {
        bio,
        skills,
        user: { name }
    }
}) => {
    const skillsItem = (skills) => {
        if (!_.isEmpty(skills)) {
            return skills.map((item, index) => {
                return (
                    skills[index] !== '' &&
                    (window.innerWidth > 700 ? (
                        <div
                            key={index}
                            className='text-primary skill-rap form-text-border'
                        >
                            <i className='fas fa-check header-icon'></i>
                            {skills[index]}
                        </div>
                    ) : (
                        <div
                            key={index}
                            className='text-primary skill-rap form-text-border'
                        >
                            <i className='fas fa-check header-icon'></i>
                            {skills[index]}
                        </div>
                    ))
                )
            })
        }
    }

    return (
        <div className='profile-about bg-light p-2 form-text-border'>
            {bio && (
                <Fragment>
                    <h2 className='text-primary form-text-border'>
                        {name.trim()}'s Bio
                    </h2>
                    <p className='form-text-border'>{bio}</p>
                    <div className='line' />
                </Fragment>
            )}
            <div className='line'></div>
            <h2 className='text-primary'>Skill Set</h2>
            <div className='skills'>{skillsItem(skills)}</div>
        </div>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileAbout
