import { AxiosResponse } from 'axios'
import { TicketingAxios } from '../common/TicketingAxios'
import { AUTH_ROUTES } from '../common/apiRoutes'

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

			console.log('response', response)

			const { data = {} } = response

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

	public static async getFakeUser(): Promise<any> {
		try {
			const response: any = await TicketingAxios.get(
				'https://fakerapi.it/api/v1/users?_quantity=1&_gender=male'
			)

			const data = response?.data.data[0]

			return data
		} catch (error: any) {
			return error?.response?.data?.message
		}
	}
}
