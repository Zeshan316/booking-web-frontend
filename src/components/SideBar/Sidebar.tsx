import React from 'react'
import { MDBIcon } from 'mdb-react-ui-kit'
import { USER_ROLES } from '../../common/constants'
import { useSelector } from 'react-redux'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import { RootState } from 'src/store'
// import { useSelector } from "react-redux"

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
		{ text: 'Rides', to: '/rides', icon: 'car-side' },
		{ text: 'Profile', to: '/profile', icon: 'user-circle' },
	]

	const adminlinks: Item[] = [
		// { text: "Users", to: "/users", icon: "users" },
		{ text: 'My Rides', to: '/rides', icon: 'car-side' },
		{ text: 'Users', to: '/', icon: 'users' },
		{ text: 'Profile', to: '/profile', icon: 'user-circle' },
	]

	const driverlinks: Item[] = [
		{ text: 'Rides', to: '/', icon: 'car-side' },
		{ text: 'Profile', to: '/profile', icon: 'user-circle' },
	]

	const sysadminlinks: Item[] = [
		{ text: 'Users', to: '/users', icon: 'users' },
		{ text: 'Rides', to: '/', icon: 'car-side' },
	]

	const userRole = authData?.user?.role.name.toLowerCase()

	if (userRole === USER_ROLES.Admin) {
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
