import React from 'react'
import Header from '../Header/Header'
import { Link } from 'react-router-dom'
import './Sidebar.css'

interface MenuItem {
	text: string
	path: string
}

function Sidebar(): JSX.Element {
	const menuItems: MenuItem[] = [
		{ text: 'Home', path: '/home' },
		{ text: 'Profile', path: '/profile' },
		{ text: 'Users', path: '/users' },
	]

	return (
		<div className={'side-nav-container'}>
			<div className='nav-menu'>
				{menuItems.map(({ text, path }) => (
					<Link key={text} to={path} className={'menu-item'}>
						<h5>{text}</h5>
					</Link>
				))}
			</div>
		</div>
	)
}

export default Sidebar
