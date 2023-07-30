import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    DELETE_EXPERIENCE,
    DELETE_EDUCATION,
    GET_PROFILES,
    GET_REPOS,
    UPLOAD_ERROR,
    UPLOAD_DOCUMENT
} from '../actions/types'

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

export default function actions(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
        case DELETE_EDUCATION:
        case DELETE_EXPERIENCE:
        case UPLOAD_DOCUMENT:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false
            }
        case PROFILE_ERROR:
        case UPLOAD_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            }
        default:
            return state
    }
}
