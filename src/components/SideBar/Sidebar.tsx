import React from 'react'
import { MDBIcon } from 'mdb-react-ui-kit'
import { USER_ROLES } from '../../common/constants'
import { useSelector } from 'react-redux'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import { RootState } from 'src/store'

interface Item {
	text: string
	to: string | any
	icon?: string
}

let links: Item[] = []

const Sidebar = () => {
	const authData = useSelector((state: RootState) => {
		return state.auth
	})

	const userlinks: Item[] = [
		{ text: 'Your Rides', to: '/rides', icon: 'car-side' },
		{ text: 'Profile', to: '/profile', icon: 'user-circle' },
	]

	const adminlinks: Item[] = [
		{ text: 'All Users', to: '/users', icon: 'users' },
		{ text: 'All Rides', to: '/rides', icon: 'car-side' },
		{ text: 'All Roles', to: '/roles', icon: 'user-cog' },
		{ text: 'Profile', to: '/profile', icon: 'user-circle' },
	]

	const sysadminlinks: Item[] = [
		{ text: 'All Users', to: '/users', icon: 'users' },
		{ text: 'All Rides', to: '/rides', icon: 'car-side' },
		{ text: 'All Roles', to: '/roles', icon: 'user-cog' },
		{ text: 'Profile', to: '/profile', icon: 'user-circle' },
	]

	const driverlinks: Item[] = [
		{ text: 'All Rides', to: '/rides', icon: 'car-side' },
		{ text: 'Profile', to: '/profile', icon: 'user-circle' },
	]

	const userRole = authData?.user?.role.name.toLowerCase()

	if (userRole === USER_ROLES.Admin.toLowerCase()) {
		links = adminlinks
	}

	if (userRole === USER_ROLES.SysAdmin.toLowerCase()) {
		links = sysadminlinks
	}

	if (userRole === USER_ROLES.Driver.toLowerCase()) {
		links = driverlinks
	}

	if (userRole === USER_ROLES.User.toLowerCase()) {
		links = userlinks
	}

	return (
		<div className='side-nav-container bg-info'>
			<div className='nav-menu'>
				{links.map((item) => (
					<NavLink to={item.to} key={item.text} className='menu-item'>
						<MDBIcon className='icon' fas icon={item.icon} />
						<span className='menu-text'>{item.text}</span>
					</NavLink>
				))}
			</div>
		</div>
	)
}

export default Sidebar
