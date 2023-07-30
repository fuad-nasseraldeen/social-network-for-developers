import axios from 'axios'
import { setAlert } from './alert'
import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    DELETE_EXPERIENCE,
    DELETE_EDUCATION,
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_PROFILES,
    GET_REPOS,
    UPLOAD_DOCUMENT,
    UPLOAD_ERROR
} from './types'

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/profile/me')

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({ type: CLEAR_PROFILE })

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

// Get All Profiles
export const getProfiles = () => async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE })
    try {
        const res = await axios.get('/api/profile')

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

// Get profile by user ID
export const getProfileByID = (userId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`)

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
    // dispatch({ type: CLEAR_PROFILE })
    try {
        const res = await axios.get(`/api/profile/github/${username}`)

        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

// Create or Update profile
export const createProfile =
    (formData, navigate, edit = false) =>
    async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const res = await axios.post('/api/profile', formData, config)
            dispatch(
                setAlert(
                    edit ? 'profile updated' : 'profile created',
                    'success'
                )
            )
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })

            if (!edit) {
                navigate('/dashboard')
            }
        } catch (err) {
            const errors = err.response.data.errors
            if (errors) {
                errors.forEach((error) =>
                    dispatch(setAlert(error.msg, 'danger'))
                )
            }

            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }

// Add Experience
export const addExperience = (formData, navigate) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/experience', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Experience Added', 'success'))
        navigate('/dashboard')
    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

//Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`)
        dispatch({
            type: DELETE_EXPERIENCE,
            payload: res.data
        })
        dispatch(setAlert('Experience Removed', 'success'))
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}
// Add Education
export const addEducation = (formData, navigate) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/education', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Education Added', 'success'))
        navigate('/dashboard')
    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

//Delete Education
export const deleteEducation = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`)
        dispatch({
            type: DELETE_EDUCATION,
            payload: res.data
        })
        dispatch(setAlert('Education Removed', 'success'))
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

//Delete Account & Profile
export const deleteAccount = (id) => async (dispatch) => {
    if (window.confirm('Are you sure? This can not be undone!')) {
        try {
            await axios.delete('/api/profile')
            dispatch({ type: CLEAR_PROFILE })
            dispatch({ type: ACCOUNT_DELETED })
            dispatch(
                setAlert('Your account has been permanatly deleteEducation')
            )
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status
                }
            })
        }
    }
}

// Update image
export const uploadImage = (image) => async (dispatch) => {
    try {
        const formData = new FormData()
        formData.append('image', image)
        const res = await axios.post('/api/profile/upload', formData)
        dispatch(setAlert('upload success', 'success'))
        dispatch({
            type: UPLOAD_DOCUMENT,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: UPLOAD_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}
