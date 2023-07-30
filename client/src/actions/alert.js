import * as types from '../actions/types'
import { v4 as uuidv4 } from 'uuid'

export const setAlert = (msg, alertType, timeout = 3000) => dispatch => {
    const id = uuidv4()
    dispatch({
        type: types.SET_ALERT,
        payload: { msg, alertType, id }
    })

    setTimeout(() => dispatch({ type: types.REMOVE_ALERT, payload: { id } }), timeout)
}