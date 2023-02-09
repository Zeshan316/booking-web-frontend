import { TicketingAxios } from '../common/TicketingAxios'
import { LOCATION_ROUTES } from '../common/apiRoutes'
import {
	LISTING_ORDER,
	INITIAL_PAGE_OFFSET,
	ITEMS_PER_PAGE,
} from '../common/constants'

export default class LocationService {
	public static async getLocations(
		tableFilters: GenericObject = {
			order: LISTING_ORDER,
			from: INITIAL_PAGE_OFFSET,
			to: 50,
		}
	): Promise<Pickup[] | Destination[]> {
		try {
			const response = await TicketingAxios.get(
				LOCATION_ROUTES.getLocations(tableFilters)
			)

			const { data: { data } = {} } = response

			return data
		} catch (error: any) {
			console.log(error)
			return error?.response?.data?.message
		}
	}
}
