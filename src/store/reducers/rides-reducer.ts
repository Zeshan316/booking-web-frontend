import { createSlice, PayloadAction } from '@reduxjs/toolkit'

declare type RideProps = {
	totalRides: number
	rides: Ride[]
	ride: Ride
}

const initialState: RideProps = {
	totalRides: 0,
	rides: [],
	ride: {
		id: '',
		direction: '',
		destination: {
			direction: '',
			locationName: '',
		},
		pickup: {
			direction: '',
			locationName: '',
		},
		user: {
			firstName: '',
			email: '',
			role: {
				name: '',
			},
		},
		tripDateTime: '',
		status: '',
	},
}

const rideSlicer = createSlice({
	name: 'rides',
	initialState,
	reducers: {
		setRides: (state, action: PayloadAction<any>) => {
			const { payload } = action
			return {
				...state,
				totalRides: payload.totaRides,
				rides: payload.rides,
			}
		},
		setRideDetail: (state, action: PayloadAction<any>) => {
			const { payload } = action
			return {
				...state,
				ride: payload,
			}
		},
	},
})

export const { setRides, setRideDetail } = rideSlicer.actions

export default rideSlicer.reducer
