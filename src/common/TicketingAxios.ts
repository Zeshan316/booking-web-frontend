import axios from 'axios'
import { clearUserData } from '../store/reducers/auth-reducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const TicketingAxios = axios.create({
	baseURL: process.env.BASE_URL || 'http://localhost:4000/',
	headers: {
		'Content-Type': 'application/json',
	},
})

TicketingAxios.interceptors.request.use(function (config) {
	const token = sessionStorage.getItem('token')

	if (token) config.headers.Authorization = `Bearer ${token}`

	return config
})

TicketingAxios.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		console.log('error axios', error)
		if (error.response.status === 401) {
			//place your reentry code
			sessionStorage.removeItem('token')
			sessionStorage.removeItem('user')
			window.location.href = '/login'
		}
		return error
	}
)

export { TicketingAxios }
