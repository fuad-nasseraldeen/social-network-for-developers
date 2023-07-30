import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
function PrivateRoute({ children }) {
  const auth = useSelector(state => state.rootReducer.auth)

  return (
    !auth.isAuthenticated && !auth.loading ? (
      <Navigate to='/login' />
    ) : (
      children
    )
  )
}


export default PrivateRoute
