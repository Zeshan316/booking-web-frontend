import React from 'react'
import { ROLE } from 'src/roles';
import { Navigate, Route, useLocation } from 'react-router-dom';

export type ProtectedRouteProps = {
	isAuthenticated?: boolean
	authenticationPath?: string
	children: JSX.Element
}

// const ProtectedRoute = () => {
// 	// Fetch token from session storage parse it to validate the tocken,
// 	// If token is valid and is authenticated from store return outlet else navigate to login
// 	// check user role here too
// 	const isAuthenticated = true

// 	if (isAuthenticated) return <Outlet />

// 	return <Navigate to='/' replace={true} />
// }

// export default ProtectedRoute



const ProtectedRoute = ({ children, roles }: { children: JSX.Element, roles:Array<ROLE> }) => {
  let location = useLocation();

  const isAuthenticated = true;
  const loading = false;
  const user={
	username: 'username', //from session storage; data.username
	role:  ROLE.Admin  //from session storage; data.role
  }

  if (loading) {
    return <p>Checking authenticaton..</p>;
  }

  const hasRole = (user && roles.includes(user?.role))

  console.log('hasRole', hasRole, user.role, roles )

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  if (isAuthenticated && !hasRole) {
	return <p>Access Denied</p> //TODO: create a component for this 
  }

  return children;
};

export default ProtectedRoute;