import React from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector } from 'react-redux'
import * as _ from 'lodash'
const Alert = () => {
    const alerts = useSelector(state => state.rootReducer.alert)
    return (

        !_.isEmpty(alerts) && alerts.length > 0 &&
        <div className='alert-container'>
            {alerts.map((alert) => {
                return (
                    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                        {alert.msg}
                    </div>
                )
            })}
        </div>

    )

}

Alert.propTypes = {
    alerts: PropTypes.array,
}

export default connect()(Alert)