import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(): JSX.Element {
	return (
		<>
			<p>
				<Link to='/'>Home</Link> |<Link to='/login'>Login</Link> |{' '}
				<Link to='/table'>Table</Link> |{' '}
				<Link to='articles'>All Articles</Link> |{' '}
				<Link to='articles/hello123'>All Articles with param</Link> |{' '}
				<Link to='sysadmin'>System Admin</Link> |{' '}
				<Link to='appadmin'>App Admin</Link> |{' '}
				<Link to='user'>User</Link>
			</p>
		</>
	)
}
