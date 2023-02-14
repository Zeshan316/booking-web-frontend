import { TicketingAxios } from '../common/TicketingAxios'
import { LOCATION_ROUTES } from '../common/apiRoutes'
import {
	LISTING_ORDER,
	INITIAL_PAGE_OFFSET,
	ITEMS_PER_PAGE,
} from '../common/constants'
import { notify } from '../common/utils'

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

	public static async getLocation(
		locationId: string
	): Promise<Pickup | Destination> {
		try {
			const response = await TicketingAxios.get(
				LOCATION_ROUTES.getLocation(locationId)
			)

			const { data: { data } = {} } = response

			return data
		} catch (error: any) {
			return error?.response?.data?.message
		}
	}

	public static async createLocation(
		formData: LocationFormProps
	): Promise<{ data: { message: string } }> {
		try {
			const response = await TicketingAxios.post(
				LOCATION_ROUTES.createLocation(),
				formData
			)

			const { data } = response

			if (data?.message) notify(data?.message, 'success')

			return data
		} catch (error: any) {
			return error?.response?.data?.message
		}
	}

	public static async updateLocation(
		locationId: string,
		formData: LocationFormProps
	): Promise<any> {
		try {
			const response = await TicketingAxios.patch(
				LOCATION_ROUTES.updateLocation(locationId),
				formData
			)

			const { data } = response

			if (data?.message) notify(data?.message, 'success')

			return data
		} catch (error: any) {
			return error?.response?.data?.message
		}
	}

	public static async deleteLocation(
		locationId: string
	): Promise<any> {
		try {
			const response = await TicketingAxios.delete(
				LOCATION_ROUTES.deleteLocation(locationId)
			)

			const { data } = response

			if (data?.message) notify(data?.message, 'success')

			return data
		} catch (error: any) {
			return error?.response?.data?.message
		}
	}
}
