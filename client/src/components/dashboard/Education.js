import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import Moment from 'react-moment'
import { deleteEducation } from '../../actions/profile'
const Education = ({ education, deleteEducation }) => {
    const educations = education?.map(exp => {
        return (
            <tr key={exp._id} className='form-text-border'>
                <td>{exp.school}</td>
                <td className='hide-sm'>{exp.degree}</td>
                <td className='hide-sm'>{exp.fieldofstudy}</td>
                <td>
                    <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {' '}
                    {exp.to === null ? (
                        'Now'
                    ) : (
                        <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
                    )}
                </td>
                <td>
                    <button onClick={() => deleteEducation(exp._id)} className='btn btn-danger form-text-border'><FormattedMessage id='delete' /></button>
                </td>
            </tr>
        )
    })
    return (
        <Fragment>
            <div className='container'>
                <h2 className='my-2'><FormattedMessage id='education.credentials' /></h2>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='hide-sm title-table'>School or Bootcamp</th>
                            <th className='hide-sm title-table'>Degree or Certificate</th>
                            <th className='hide-sm title-table'>Field Of Study</th>
                            <th className='hide-sm title-table'>Years</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>{educations}</tbody>
                </table>
            </div>
        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired
}

export default injectIntl(connect(null, { deleteEducation })(Education))

