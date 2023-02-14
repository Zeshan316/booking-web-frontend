import { TicketingAxios } from '../common/TicketingAxios'
import { RIDE_ROUTES } from '../common/apiRoutes'
import {
	LISTING_ORDER,
	INITIAL_PAGE_OFFSET,
	ITEMS_PER_PAGE,
} from '../common/constants'
import { notify } from '../common/utils'

export default class RideService {
	public static async getRides(
		tableFilters: GenericObject = {
			order: LISTING_ORDER,
			from: INITIAL_PAGE_OFFSET,
			to: ITEMS_PER_PAGE,
		}
	): Promise<Ride[]> {
		try {
			// console.log(RIDE_ROUTES.getRides(tableFilters))
			const response = await TicketingAxios.get(
				RIDE_ROUTES.getRides(tableFilters)
			)

			const { data: { data } = {} } = response

			// console.log('data', data)
			return data
		} catch (error: any) {
			console.log(error)
			return error?.response?.data?.message
		}
	}

	public static async getRide(userId: string): Promise<Ride> {
		try {
			const response = await TicketingAxios.get(
				RIDE_ROUTES.getRide(userId)
			)

			const { data: { data } = {} } = response

			return data
		} catch (error: any) {
			return error?.response?.data?.message
		}
	}

	public static async createRide(
		formData: RideFormProps
	): Promise<{ data: { message: string } }> {
		try {
			const response = await TicketingAxios.post(
				RIDE_ROUTES.createRide(),
				formData
			)

			const { data } = response

			if (data?.message) notify(data?.message, 'success')

			return data
		} catch (error: any) {
			return error?.response?.data?.message
		}
	}

	public static async updateRide(
		rideId: string,
		formData: RideFormProps
	): Promise<any> {
		try {
			const response = await TicketingAxios.patch(
				RIDE_ROUTES.updateRide(rideId),
				formData
			)

			const { data } = response

			if (data?.message) notify(data?.message, 'success')

			return data
		} catch (error: any) {
			return error?.response?.data?.message
		}
	}

	public static async updateRideStaus(
		rideId: string,
		rideStatus: string
	): Promise<any> {
		try {
			const response = await TicketingAxios.put(
				RIDE_ROUTES.updateRideStatus(rideId),
				{
					rideStatus,
				}
			)

			const { data } = response

			if (data?.message) notify(data?.message, 'success')

			return data
		} catch (error: any) {
			return error?.response?.data?.message
		}
	}

	public static async deleteRide(rideId: string): Promise<any> {
		try {
			const response = await TicketingAxios.delete(
				RIDE_ROUTES.deleteRide(rideId)
			)

			const { data } = response

			if (data?.message) notify(data?.message, 'success')

			return data
		} catch (error: any) {
			return error?.response?.data?.message
		}
	}
}
