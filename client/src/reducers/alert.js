import * as types from '../actions/types'
const initialState = []

export default function actions(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case types.SET_ALERT:
            return [...state, payload]
        case types.REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload.id)
        default:
            return state
    }
}