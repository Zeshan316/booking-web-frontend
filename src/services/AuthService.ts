import { AxiosResponse } from 'axios'
import { TicketingAxios } from '../common/TicketingAxios'
import { AUTH_ROUTES } from '../common/apiRoutes'
import { notify } from '../common/utils'

export default class AuthService {
	public static async login(
		email: string,
		password: string
	): Promise<AuthResponse> {
		try {
			const response = await TicketingAxios.post(AUTH_ROUTES.login, {
				email,
				password,
			})

			const { data = {}, status } = response

			if (status === 200 || status === 201)
				notify("You're logged in!", 'success')

			const authData = this.formatResponse(data)

			return authData
		} catch (error: any) {
			return error?.response?.data?.message
		}
	}

	public static formatResponse(
		response: AxiosResponse
	): AuthResponse {
		return {
			user: response?.data?.user,
			jwtToken: response?.data?.token,
		}
	}

	public static async getCurrentUser(): Promise<any> {
		try {
			const token = sessionStorage.getItem('token') || false
			if (!token) {
				window.location.replace('/login')
				return
			}
			const response = await TicketingAxios.get(AUTH_ROUTES.login)

			const { data = {} } = response
			const authData = this.formatResponse(data)

			return authData
		} catch (error: any) {
			console.log('error', error)
			if (error?.response?.status === 401) {
			}
			return error?.response?.data?.message
		}
	}
}
