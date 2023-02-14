import React from 'react'
import './App.css'
import {
	BrowserRouter,
	HashRouter,
	Routes,
	Route,
} from 'react-router-dom'
import AuthService from './services/AuthService'
import Login from './pages/Login'
// import NoInternetToast from './components/NoInternetToast'
import AdminDashboard from './components/Admin/AdminDashboard'
import ProtectedRoute from './routes/ProtectedRoute'
import UserProfile from './components/User/UserProfile'
import NotFound from './components/NotFound/NotFound'
import { useSelector } from 'react-redux'
import { RootState } from './store'
import { useDispatch } from 'react-redux'
import { setUserData } from './store/reducers/auth-reducer'
import Rides from './components/Rides/Rides'
import Roles from './components/Roles/Roles'
import Locations from './components/Locations/Locations'
import 'react-datetime/css/react-datetime.css'
import { notify } from './common/utils'

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
		const showSuccessNotify = () => {
			notify('You are online!', 'success')
		}
		const showErrorNotify = () => {
			notify('You are offline!', 'error')
		}

		window.addEventListener('online', showSuccessNotify)
		window.addEventListener('offline', showErrorNotify)

		getCurrentUser()

		return () => {
			window.removeEventListener('online', showSuccessNotify)
			window.removeEventListener('offline', showErrorNotify)
		}
	}, [])

	return (
		<BrowserRouter>
			<Routes>
				{/* <Route path='/' element={<span>Loading....</span>} /> */}
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
					path='/roles'
					element={
						<ProtectedRoute>
							<Roles />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/locations'
					element={
						<ProtectedRoute>
							<Locations />
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

				<Route path='/login' element={<Login />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
