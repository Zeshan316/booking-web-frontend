import axios from 'axios'

const TicketingAxios = axios.create({
	baseURL: process.env.BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

TicketingAxios.interceptors.request.use(function (config) {
	const token = sessionStorage.getItem('token')

	if (token) config.headers.Authorization = token

	return config
})

export { TicketingAxios }
