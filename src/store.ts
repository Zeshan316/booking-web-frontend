import { configureStore } from '@reduxjs/toolkit'
import articleReducer from './store/reducers/article-reducer'
import authReducer from './store/reducers/auth-reducer'
import userReducer from './store/reducers/users-reducer'
import rideReducer from './store/reducers/rides-reducer'
import locationReducer from './store/reducers/locations-reducer'

export const store = configureStore({
	reducer: {
		article: articleReducer,
		auth: authReducer,
		user: userReducer,
		ride: rideReducer,
		locationReducer: locationReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
