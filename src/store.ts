import { configureStore } from '@reduxjs/toolkit'
import authReducer from './store/reducers/auth-reducer'
import userReducer from './store/reducers/users-reducer'
import rideReducer from './store/reducers/rides-reducer'
import locationReducer from './store/reducers/locations-reducer'
import roleReducer from './store/reducers/roles-reducer'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
		ride: rideReducer,
		locationReducer: locationReducer,
		roleReducer: roleReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
