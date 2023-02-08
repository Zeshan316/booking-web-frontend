import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const notify = (msg: string, type: string) => {
	return toast(msg, { theme: 'light', type: 'warning' })
}

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
		if (error.response.status === 400) {
			notify(error?.response?.data?.message, 'error')
		}
		if (error.response.status === 401) {
			//place your reentry code
			notify(
				error?.response?.data?.message || 'invalid token',
				'error'
			)
			sessionStorage.removeItem('token')
			sessionStorage.removeItem('user')
			window.location.href = '/login'
		}
		return error
	}
)

export { TicketingAxios }
