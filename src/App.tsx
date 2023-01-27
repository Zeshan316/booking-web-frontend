import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './components/Dashboard/Dashboard'
import ProtectedRoute from './routes/ProtectedRoute'
import SysAdmin from './components/SysAdmin'
import AppAdmin from './components/AppAdmin'
import User from './components/User'

function App(): JSX.Element {
	React.useEffect(() => {}, [])

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/home' element={<ProtectedRoute />}>
					<Route path='' element={<Dashboard />} />
				</Route>

				<Route path='/users' element={<ProtectedRoute />}>
					{/* Should show all users in a table */}
					<Route path='' element={<User />} />
					{/* Should show form for to create a user */}
					<Route path='add' element={<SysAdmin />} />
					{/* Should show filled user data form */}
					<Route path='edit' element={<SysAdmin />} />
				</Route>

				<Route path='appadmin'>
					<Route path='' element={<AppAdmin />} />
				</Route>

				<Route path='/login' element={<Login />} />

				<Route path='*' element={<h4>oops 404</h4>} />
			</Routes>
		</BrowserRouter>
	)

	/* return (
		<BrowserRouter>
			<Navbar />
			<br />
			<Routes>
				<Route path='/' element={<>main</>} loader={() => '....'} /> 
				<Route path='/' element={<Login />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route
					path='articles'
					element={
						<>
							<h4>All article listing...</h4>
							<Outlet />
						</>
					}
				>
					<Route index path='' element={<AllArticle />} />
					<Route path=':id' element={<ArticleDetail />} />
				</Route>

				<Route
					path='sysadmin'
					element={
						<ProtectedRoute
							{...defaultProtectedRouteProps}
							outlet={<AllArticle />}
						/>
					}
				>
					<Route path='' element={<SysAdmin />} />
				</Route>

				<Route path='appadmin'>
					<Route path='' element={<AppAdmin />} />
				</Route>

				<Route path='user'>
					<Route path='' element={<User />} />
				</Route>

				<Route path='*' element={<h4>oops 404</h4>} />
			</Routes>
		</BrowserRouter>
	) */
}

export default App
