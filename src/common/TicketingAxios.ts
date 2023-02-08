import axios from 'axios'
import { notify } from './utils'

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
		//handle if status code is 400
		if (error?.response?.status === 400) {
			notify(error?.response?.data?.message, 'error')
		}
		//handle if status code is 401
		if (error?.response?.status === 401) {
			notify(
				error?.response?.data?.message || 'invalid token',
				'error'
			)
			sessionStorage.removeItem('token')
			sessionStorage.removeItem('user')
			window.location.href = '/login'
		}
		console.log('eror-------------------------', error)
		return error
	}
)

export { TicketingAxios }
