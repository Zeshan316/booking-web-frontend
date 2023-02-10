import React from 'react'
import {
	Navigate,
	Outlet,
	Route,
	useLocation,
	useNavigate,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import jwtDecode from 'jwt-decode'
import { notify } from '../common/utils'
import { useDispatch } from 'react-redux'
import { hasUserAccessRights } from '../common/utils'
import NotFound from '../components/NotFound/NotFound'

import { clearUserData } from 'src/store/reducers/auth-reducer'

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

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
	const dispatch = useDispatch()
	let location = useLocation()

	const authData = useSelector((state: RootState) => state.auth)
	const token = sessionStorage.getItem('token') as string

	// console.info('tokentokentoken', token)
	if (!token?.length || token === null || token === undefined) {
		console.error('no token found')
		dispatch(clearUserData())
		return (
			<Navigate
				to='/login'
				state={{ from: location }}
				replace={true}
			/>
		)
	}

	const decodedToken: GenericObject = jwtDecode(token)

	// console.log(decodedToken, 'decodedToken', authData?.isLoggedIn)
	if (decodedToken?.exp < Math.floor(Date.now() / 1000)) {
		notify('Your token has been expired', 'info')
		dispatch(clearUserData())
		return (
			<Navigate
				to='/login'
				state={{ from: location }}
				replace={true}
			/>
		)
	}

	const userHasRights = hasUserAccessRights(authData.user.role.name)
		? true
		: false

	if (!userHasRights) {
		return <NotFound /> // build your won access denied page (sth like 404)
	}

	return children
	/* const isAuthenticated = true
	const loading = false
	const user = {
		username: 'username', //from session storage; data.username
		role: ROLE.Admin, //from session storage; data.role
	} */

	/* if (loading) {
		return <p>Checking authenticaton..</p>
	}
 */
	// const hasRole = user && roles.includes(user?.role)
	// console.log('hasRole', hasRole, user.role, roles)

	/* if (isAuthenticated && !hasRole) {
		return <p>Access Denied</p> //TODO: create a component for this
	} */
}

export default ProtectedRoute
