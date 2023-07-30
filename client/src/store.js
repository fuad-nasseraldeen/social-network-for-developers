import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import rootReducer from './reducers'

const reducer = combineReducers({
    rootReducer
})

const store = configureStore({
    reducer
})

export default store
