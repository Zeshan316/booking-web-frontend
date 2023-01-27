import React from 'react'
import Header from '../Header/Header'
import Sidebar from '../SideBar/Sidebar'
import './Layout.css'

interface LayoutProps {
	children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<>
			<Header />
			<div className='main'>
				<Sidebar />
				<main className='container'>{children}</main>
			</div>
		</>
	)
}

export default Layout
