import React from 'react'
import { Navigate } from 'react-router-dom'

// Dummy authentication check (always allows access)
const isAuthenticated = () => true

const ProtectedRoute = ({children}) => {
  return isAuthenticated() ? children : <Navigate to='/'/>
}

export default ProtectedRoute
