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
	): Promise<User[]> {
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

	public static async getUser(userId: string): Promise<User> {
		try {
			const response = await TicketingAxios.get(
				USER_ROUTES.getUser(userId)
			)

			const { data: { data } = {} } = response

			return data
		} catch (error: any) {
			return error?.response?.data?.message
		}
	}

	public static async createUser(
		formData: UserFormProps
	): Promise<{ data: { message: string } }> {
		try {
			const response = await TicketingAxios.post(
				USER_ROUTES.createUser(),
				formData
			)

			const { data } = response

			if (data?.message) notify(data?.message, 'success')

			return data
		} catch (error: any) {
			return error?.response?.data?.message
		}
	}

	public static async updateUser(
		userId: string,
		formData: UserFormProps
	): Promise<any> {
		try {
			console.log('url', USER_ROUTES.updateUser(userId), formData)
			const response = await TicketingAxios.patch(
				USER_ROUTES.updateUser(userId),
				formData
			)

			const { data } = response

			if (data?.message) notify(data?.message, 'success')

			return data
		} catch (error: any) {
			return error?.response?.data?.message
		}
	}

	public static async deleteUser(userId: string): Promise<any> {
		try {
			const response = await TicketingAxios.delete(
				USER_ROUTES.deleteUser(userId)
			)

			console.log(response)

			const { data } = response

			if (data?.message) notify(data?.message, 'success')

			return data
		} catch (error: any) {
			return error?.response?.data?.message
		}
	}
}
