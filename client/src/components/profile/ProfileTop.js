import React from 'react'
import PropTypes from 'prop-types'

function ProfileTop({ profile }) {
    const {
        status,
        company,
        location,
        website,
        social,
        user: { name, avatar }
    } = profile

    return (
        <div className="profile-top bg-primary p-2 form-text-border">
            <img
                className={`${
                    name === 'Fuad Nasser-Aldeen'
                        ? 'round-img my-1 myProfile'
                        : 'round-img my-1'
                }`}
                src={name !== 'Fuad Nasser-Aldeen' && avatar}
                alt=""
            />
            <h1 className="large form-text-border">{name}</h1>
            <p className="lead form-text-border">
                {status} {company && <span>at {company}</span>}
            </p>
            <p className="form-text-border">{location}</p>
            <div className="icons my-1">
                {social && social.linkedln && (
                    <a
                        href={social.linkedln}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-linkedln fa-2x header-icon"></i>
                    </a>
                )}
                {website && (
                    <a href={website} target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-globe fa-2x header-icon"></i>
                    </a>
                )}
                {social && social.github && (
                    <a
                        href={social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-github fa-2x header-icon"></i>
                    </a>
                )}
                {social && social.facebook && (
                    <a
                        href={social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-facebook fa-2x header-icon"></i>
                    </a>
                )}
                {social && social.instagram && (
                    <a
                        href={social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-instagram fa-2x header-icon"></i>
                    </a>
                )}
                {social && social.youtube && (
                    <a
                        href={social.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-youtube fa-2x header-icon"></i>
                    </a>
                )}
                {social && social.linkedin && (
                    <a
                        href={social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-linkedin fa-2x header-icon"></i>
                    </a>
                )}
            </div>
        </div>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileTop
