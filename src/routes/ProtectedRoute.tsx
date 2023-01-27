import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export type ProtectedRouteProps = {
	isAuthenticated?: boolean
	authenticationPath?: string
	children: JSX.Element
}

const ProtectedRoute = () => {
	// Fetch token from session storage parse it to validate the tocken,
	// If token is valid and is authenticated from store return outlet else navigate to login
	// check user role here too
	const isAuthenticated = true

	if (isAuthenticated) return <Outlet />

	return <Navigate to='/' replace={true} />
}

export default ProtectedRoute
