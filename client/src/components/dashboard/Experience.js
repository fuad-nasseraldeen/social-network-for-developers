import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import Moment from 'react-moment'
import { deleteExperience } from '../../actions/profile'
const Experience = ({ experience, deleteExperience }) => {
    const experiences = experience?.map(exp => {
        return (
            <tr key={exp._id} className='form-text-border'>
                <td>{exp.company}</td>
                <td className='hide-sm'>{exp.title}</td>
                <td>
                    <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {' '}
                    {exp.to === null ? (
                        'Now'
                    ) : (
                        <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
                    )}
                </td>
                <td>
                    <button onClick={() => deleteExperience(exp._id)} className='btn btn-danger form-text-border'><FormattedMessage id='delete' /></button>
                </td>
            </tr>
        )
    })
    return (
        <Fragment>
            <div className='container'>
                <h2 className='my-2'><FormattedMessage id='experience.credentials' /></h2>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='hide-sm title-table'>Company</th>
                            <th className='hide-sm title-table'>Title</th>
                            <th className='hide-sm title-table'>Years</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>{experiences}</tbody>
                </table>
            </div>
        </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
}

export default injectIntl(connect(null, { deleteExperience })(Experience))

