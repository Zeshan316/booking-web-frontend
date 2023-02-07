import { TicketingAxios } from '../common/TicketingAxios'
import { USER_ROUTES } from '../common/apiRoutes'

export default class UserService {
	public static async getUsers(): Promise<User[] | void> {
		try {
			const response = await TicketingAxios.get(
				USER_ROUTES.getUsers()
			)

			console.log('response', response)

			const { data = {} } = response
		} catch (error: any) {
			return error?.response?.data?.message
		}
	}

	public static async getUser(): Promise<any> {
		try {
		} catch (error: any) {
			return error?.response?.data?.message
		}
	}

	public static async updateUser(): Promise<any> {
		try {
		} catch (error: any) {
			return error?.response?.data?.message
		}
	}

	public static async deleteUser(): Promise<any> {
		try {
		} catch (error: any) {}
	}
}
