import { TicketingAxios } from '../common/TicketingAxios'
import { USER_ROUTES } from '../common/apiRoutes'
import {
	LISTING_ORDER,
	INITIAL_PAGE_OFFSET,
	ITEMS_PER_PAGE,
} from '../common/constants'
import { notify } from '../common/utils'

export default class UserService {
	public static async getUsers(
		tableFilters: GenericObject = {
			order: LISTING_ORDER,
			from: INITIAL_PAGE_OFFSET,
			to: ITEMS_PER_PAGE,
		}
	): Promise<User[] | void> {
		try {
			console.log(USER_ROUTES.getUsers(tableFilters))
			const response = await TicketingAxios.get(
				USER_ROUTES.getUsers(tableFilters)
			)

			const { data: { data } = {} } = response

			// console.log('data', data)
			return data
		} catch (error: any) {
			console.log(error)
			return error?.response?.data?.message
		}
	}

	public static async getUser(): Promise<any> {
		try {
		} catch (error: any) {
			return error?.response?.data?.message
		}
	}

	public static async createUser(
		formData: UserFormProps
	): Promise<any> {
		try {
			const response = await TicketingAxios.post(
				USER_ROUTES.createUser(),
				formData
			)

			const { data } = response

			console.log('data', data, response)

			if (data?.message) notify(data?.message, 'success')

			// console.log('data', data)
			return data
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
