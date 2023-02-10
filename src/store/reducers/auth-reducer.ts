import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { json } from 'stream/consumers'

declare type AuthUser = {
	isLoggedIn?: boolean
	jwtToken: string
	user: User
}

const initialState: AuthUser = {
	user: {
		id: '',
		firstName: '',
		lastName: '',
		email: '',
		isActive: 0,
		profileImgUrl: '',
		role: {
			id: '',
			name: '',
		},
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

			sessionStorage.setItem('token', payload.jwtToken)
			// sessionStorage.setItem('user', JSON.stringify(payload.user))

			const { role, ...userData } = payload.user

			return {
				...state,
				isLoggedIn: payload.jwtToken ? true : false,
				jwtToken: payload.jwtToken,
				user: {
					id: userData.id,
					firstName: userData.firstName,
					lastName: userData.lastName,
					email: userData.email,
					isActive: userData.isActive,
					profileImgUrl: userData.profileImgUrl,
					role: {
						id: role.id,
						name: role.name,
					},
				},
			}
		},
		clearUserData: (state) => {
			sessionStorage.removeItem('token')
			// sessionStorage.removeItem('user')

			return {
				...initialState,
			}
		},
	},
})

export const { setUserData, clearUserData } = authSlicer.actions

export default authSlicer.reducer
