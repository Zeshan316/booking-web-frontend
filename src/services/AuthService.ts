import { AxiosResponse } from 'axios'
import { TicketingAxios } from '../common/TicketingAxios'
import { AUTH } from '../common/apiRoutes'

/* export interface AuthResponse {
	user: User
	jwtToken: string
} */

export default class AuthService {
	public static async login(
		email: string,
		password: string
	): Promise<AuthResponse> {
		try {
			const response = await TicketingAxios.post(AUTH.login, {
				email,
				password,
			})

			const data = this.formatResponse(response)

			this.storeData()

			return data
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

	public static storeData(): any {
		// store data in reducer
		//store data in session storage
	}

	public static async getCurrentUser(): Promise<any> {
		try {
			const response = await TicketingAxios.post(AUTH.login)

			const data = this.formatResponse(response)

			this.storeData()

			return data
		} catch (error: any) {
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
