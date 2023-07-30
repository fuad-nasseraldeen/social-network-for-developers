import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, FormattedMessage } from 'react-intl'
import { connect, useSelector } from 'react-redux'
import { getGithubRepos } from '../../actions/profile'
import * as _ from 'lodash'
function ProfileGithub({ username, getGithubRepos }) {
    useEffect(() => {
        getGithubRepos(username)
    }, [getGithubRepos, username])

    const repos = useSelector((state) => state.rootReducer.profile.repos)

    return (
        <Fragment>
            <div className='profile-github'>
                <h2 className='text-primary my-1'>
                    <i className='fab fa-github'></i>{' '}
                    <FormattedMessage id='github.repos' />
                    {!_.isEmpty(repos) &&
                        repos.length > 0 &&
                        repos.map((repo) => {
                            return (
                                <div
                                    key={repo.id}
                                    className='repo bg-white p-1 my-1 form-text-border'
                                >
                                    <div className='repo-flex'>
                                        <div>
                                            <h4>
                                                {/* eslint-disable-next-line */}
                                                <a
                                                    href={repo.html_url}
                                                    target='_blank'
                                                    rel='noopener norefrrer'
                                                    className={`${
                                                        repo.name.length > 18
                                                            ? 'repo-name'
                                                            : undefined
                                                    }`}
                                                >
                                                    {repo.name}
                                                </a>
                                            </h4>
                                            <div className='repo-description'>
                                                <p>{repo.description}</p>
                                            </div>
                                        </div>

                                        <div className='repo-stars-watchers-forks '>
                                            <ul>
                                                <li className='badge badge-primary'>
                                                    <FormattedMessage id='github.repos.stars' />
                                                    {repo.stargazers_count}
                                                </li>
                                                <li className='badge badge-dark'>
                                                    <FormattedMessage id='github.repos.watchers' />
                                                    {repo.watchers_count}
                                                </li>
                                                <li className='badge badge-light'>
                                                    <FormattedMessage id='github.repos.forks' />
                                                    {repo.forks_count}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                </h2>
            </div>
        </Fragment>
    )
}

ProfileGithub.propTypes = {
    username: PropTypes.string.isRequired
}

export default injectIntl(connect(null, { getGithubRepos })(ProfileGithub))
