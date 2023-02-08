import { TicketingAxios } from '../common/TicketingAxios'
import { ROLES_ROUTES } from '../common/apiRoutes'
import {
	INITIAL_PAGE_OFFSET,
	LISTING_ORDER,
	ITEMS_PER_PAGE,
} from '../common/constants'

export default class RoleService {
	public static async getRoles(
		tableFilters: GenericObject = {
			order: LISTING_ORDER,
			from: INITIAL_PAGE_OFFSET,
			to: 50,
		}
	): Promise<any> {
		try {
			const response = await TicketingAxios.get(
				ROLES_ROUTES.getRoles(tableFilters)
			)

			console.log(response)
			const { data: { data } = {} } = response

			return data
		} catch (error: any) {
			console.log(error)
			return error?.response?.data?.message
		}
	}

	public static async getRole(): Promise<any> {
		try {
		} catch (error: any) {
			return error?.response?.data?.message
		}
	}

	public static async createRole(
		formData: UserFormProps
	): Promise<any> {
		try {
			const response = await TicketingAxios.post(
				ROLES_ROUTES.createUser(),
				formData
			)

			const { data: { data } = {} } = response

			// console.log('data', data)
			return data
		} catch (error: any) {
			console.log(error)
			return error?.response?.data?.message
		}
	}

	public static async updateRole(): Promise<any> {
		try {
		} catch (error: any) {
			return error?.response?.data?.message
		}
	}

	public static async deleteRole(): Promise<any> {
		try {
		} catch (error: any) {}
	}
}
