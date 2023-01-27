import { configureStore } from '@reduxjs/toolkit'
import articleReducer from './store/reducers/article-reducer'
import authReducer from './store/reducers/auth-reducer'

export const store = configureStore({
	reducer: {
		article: articleReducer,
		auth: authReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
