import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { json } from 'stream/consumers'

declare type AuthUser = {
	isLoggedIn: boolean
	jwtToken: string
	user: User
}

const initialState: AuthUser = {
	user: {
		id: '',
		firstName: '',
		lastName: '',
		email: '',
		profileImgUrl: '',
		role: '',
	},
	isLoggedIn: false,
	jwtToken: '',
}

const authSlicer = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUserData: (state, action: PayloadAction<any>) => {
			const { payload } = action
			console.log('payload', payload)
			sessionStorage.setItem('token', payload.jwtToken)
			sessionStorage.setItem('user', JSON.stringify(payload.user))
			return {
				...state,
				isLoggedIn: payload.jwtToken ? true : false,
				...payload,
			}
		},
		clearUserData: (state) => {
			sessionStorage.removeItem('token')
			sessionStorage.removeItem('user')

			return {
				...initialState,
			}
		},
	},
})

export const { setUserData, clearUserData } = authSlicer.actions

export default authSlicer.reducer
