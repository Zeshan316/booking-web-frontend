import { createSlice, PayloadAction } from '@reduxjs/toolkit'

declare type LocationProps = {
	totalLocations: number
	locations: Pickup[] | Destination[]
}

const initialState: LocationProps = {
	totalLocations: 0,
	locations: [],
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
	},
})

export const { setLocations } = locationSlicer.actions

export default locationSlicer.reducer
