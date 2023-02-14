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

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
	const dispatch = useDispatch()
	let location = useLocation()

	const authData = useSelector((state: RootState) => state.auth)
	const token = sessionStorage.getItem('token') as string

	if (!token?.length || token === null || token === undefined) {
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
}

export default ProtectedRoute
