import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthService from './services/AuthService'
import Login from './pages/Login'
import AdminDashboard from './components/Admin/AdminDashboard'
import ProtectedRoute from './routes/ProtectedRoute'
import UserProfile from './components/User/UserProfile'
import NotFound from './components/NotFound/NotFound'
import { useSelector } from 'react-redux'
import { RootState } from './store'
import { useDispatch } from 'react-redux'
import { setUserData } from './store/reducers/auth-reducer'
import Rides from './components/Rides/Rides'
import 'react-datetime/css/react-datetime.css'
// import Users from './components/Admin/Users'

function App(): JSX.Element {
	const dispatch = useDispatch()

	const authData = useSelector((state: RootState) => {
		return state.auth
	})

	async function getCurrentUser() {
		if (window?.location?.pathname === '/login') return

		const userData = await AuthService.getCurrentUser()
		if (!authData.jwtToken) dispatch(setUserData(userData))
	}

	React.useEffect(() => {
		getCurrentUser()
	}, [])

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/rides'
					element={
						<ProtectedRoute>
							<Rides />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/users'
					element={
						<ProtectedRoute>
							<AdminDashboard />
						</ProtectedRoute>
					}
				/>

				<Route
					path='profile'
					element={
						<ProtectedRoute>
							<UserProfile />
						</ProtectedRoute>
					}
				/>

				{/* <Route path='rides' element={<AdminRides />} /> */}
				{/* <Route path='users' element={<Users />} /> */}

				{/* <Route path='profile' element={<UserProfile />} /> */}
				{/* Ride History */}
				{/* <Route path='history' element={<RideHistory />} /> */}

				{/* <Route path="/users" element={<ProtectedRoute />}> */}
				{/* Should show all users in a table */}

				{/* this path is being rendered when Admin logs in: fix */}
				{/* <Route path='' element={<AdminDashboard />} /> */}
				{/* Should show form to create a user */}

				<Route path='/login' element={<Login />} />

				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
