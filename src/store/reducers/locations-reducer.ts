import { createSlice, PayloadAction } from '@reduxjs/toolkit'

declare type LocationProps = {
	totalLocations: number
	locations: Pickup[] | Destination[]
	location: Pickup | Destination
}

const initialState: LocationProps = {
	totalLocations: 0,
	locations: [],
	location: {
		locationName: '',
		direction: '',
	},
}

const locationSlicer = createSlice({
	name: 'locationReducer',
	initialState,
	reducers: {
		setLocations: (state, action: PayloadAction<any>) => {
			const { payload } = action
			return {
				...state,
				totalLocations: payload.totalLocations,
				locations: payload.locations,
			}
		},
		setLocationDetail: (state, action: PayloadAction<any>) => {
			const { payload } = action
			return {
				...state,
				location: payload,
			}
		},
		clearLocationDetail: (state) => {
			return {
				...state,
				location: {
					locationName: '',
					direction: '',
				},
			}
		},
	},
})

export const {
	setLocations,
	setLocationDetail,
	clearLocationDetail,
} = locationSlicer.actions

export default locationSlicer.reducer
